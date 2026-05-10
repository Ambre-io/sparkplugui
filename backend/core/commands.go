/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */

package core

import (
	"fmt"
	"strings"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

const connectTimeout = 30 * time.Second

// ******************************************
// * CONNECT
// ******************************************

func (a *App) CmdConnect(setup MQTTSetup) ConnectResult {

	// Validate required fields
	if setup.Host == "" {
		fmt.Println("### Connect: host is empty")
		return ConnectResult{Ok: false, ErrorCode: ErrHostEmpty}
	}
	if setup.Topic == "" {
		fmt.Println("### Connect: topic is empty")
		return ConnectResult{Ok: false, ErrorCode: ErrTopicEmpty}
	}

	// Resolve protocol (default: tcp)
	proto := strings.ToLower(strings.TrimSpace(setup.Protocol))
	if proto == "" {
		proto = "tcp"
	}

	// Build broker address
	var address string
	if setup.Port != "" {
		address = fmt.Sprintf("%s://%s:%s", proto, setup.Host, setup.Port)
	} else {
		address = fmt.Sprintf("%s://%s", proto, setup.Host)
	}
	// Append WebSocket path for ws/wss (most brokers require /mqtt)
	if proto == "ws" || proto == "wss" {
		wsPath := strings.TrimSpace(setup.WsPath)
		if wsPath == "" {
			wsPath = "/"
		} else if !strings.HasPrefix(wsPath, "/") {
			wsPath = "/" + wsPath
		}
		address += wsPath
	}
	fmt.Printf("### Connect: broker address = %s\n", address)

	// Build options
	options := MQTT.NewClientOptions()
	options.AddBroker(address)
	options.SetClientID(fmt.Sprintf("SparkpluGUI-%d", time.Now().UnixNano()))
	options.SetCleanSession(true)
	options.SetOrderMatters(true) // single dispatch goroutine — prevents goroutine explosion on busy wildcard topics
	options.SetMessageChannelDepth(1024)
	options.SetConnectTimeout(connectTimeout)
	// Disable auto-reconnect: if the broker drops us, we notify the frontend
	// and let the user decide to reconnect. Auto-reconnect causes paho to start
	// background goroutines that can panic against gorilla/websocket v1.5.3.
	options.SetAutoReconnect(false)
	options.SetConnectionLostHandler(a.onConnectionLost)

	if setup.Username != "" {
		options.SetUsername(setup.Username)
	}
	if setup.Password != "" {
		options.SetPassword(setup.Password)
	}

	// TLS: required for ssl:// and wss://, optional for tcp:// and ws://
	needsTLS := proto == "ssl" || proto == "wss"
	hasCerts := setup.CACrt != "" || (setup.ClientCrt != "" && setup.ClientKey != "")

	if needsTLS || hasCerts {
		tlscfg, errCode := NewTLSConfig(setup)
		if errCode != "" {
			fmt.Printf("### Connect: TLS config error: %s\n", errCode)
			return ConnectResult{Ok: false, ErrorCode: errCode}
		}
		options.SetTLSConfig(tlscfg)
		fmt.Printf("### Connect: TLS enabled (proto=%s)\n", proto)
	}

	// Tear down any previous connection before creating a new client.
	// Without this, old paho goroutines leak every time the user reconnects.
	a.stopWorker()
	if a.MQTTCLIENT != nil {
		a.MQTTCLIENT.Disconnect(0)
	}

	// Connect with a hard timeout so CmdConnect never blocks indefinitely
	a.MQTTCLIENT = MQTT.NewClient(options)
	token := a.MQTTCLIENT.Connect()
	if !token.WaitTimeout(connectTimeout) {
		fmt.Println("### Connect: timed out waiting for CONNACK")
		a.MQTTCLIENT.Disconnect(0)
		return ConnectResult{Ok: false, ErrorCode: ErrTimeout}
	}
	if err := token.Error(); err != nil {
		errCode := classifyConnectError(err)
		fmt.Printf("### Connect: failed [%s]: %s\n", errCode, err)
		return ConnectResult{Ok: false, ErrorCode: errCode}
	}

	// Launch message worker
	a.init()
	a.stopWorker()
	a.startWorker()

	// Subscribe
	subToken := a.MQTTCLIENT.Subscribe(setup.Topic, 0, func(_ MQTT.Client, message MQTT.Message) {
		select {
		case a.RAWMESSAGES <- message:
		default:
		}
	})
	if !subToken.WaitTimeout(connectTimeout) {
		fmt.Println("### Connect: timed out waiting for SUBACK")
		a.MQTTCLIENT.Disconnect(0)
		return ConnectResult{Ok: false, ErrorCode: ErrSubscribe}
	}
	if err := subToken.Error(); err != nil {
		fmt.Printf("### Connect: subscribe failed: %s\n", err)
		a.MQTTCLIENT.Disconnect(250)
		return ConnectResult{Ok: false, ErrorCode: ErrSubscribe}
	}

	a.lastTopic = setup.Topic
	fmt.Printf("### Connect: success, subscribed to %s\n", setup.Topic)
	return ConnectResult{Ok: true, ErrorCode: ""}
}

// ******************************************
// * DISCONNECT
// ******************************************

func (a *App) CmdDisconnect() bool {
	if a.lastTopic != "" {
		a.MQTTCLIENT.Unsubscribe(a.lastTopic)
	}
	a.stopWorker()
	a.init()
	a.MQTTCLIENT.Disconnect(250)
	return true
}

// ******************************************
// * CONNECTION LOST
// ******************************************

// onConnectionLost is called by paho when the broker drops the connection.
// It runs in a paho-internal goroutine.
func (a *App) onConnectionLost(_ MQTT.Client, err error) {
	errCode := classifyConnectError(err)
	fmt.Printf("### Connection lost [%s]: %s\n", errCode, err)
	a.stopWorker()
	// Notify the frontend so it can flip the connected toggle and show a toast.
	wailsRuntime.EventsEmit(a.context, "connectionLost", errCode)
}

// ******************************************
// * ERROR CLASSIFICATION
// ******************************************

// classifyConnectError maps raw paho/network errors to one of the typed Err* constants.
func classifyConnectError(err error) string {
	msg := strings.ToLower(err.Error())

	switch {
	// TLS / certificate errors
	case strings.Contains(msg, "tls") ||
		strings.Contains(msg, "x509") ||
		strings.Contains(msg, "certificate") ||
		strings.Contains(msg, "handshake"):
		return ErrTLSHandshake

	// Protocol mismatch (e.g. tcp:// dialed against a WebSocket-only port → EOF)
	case strings.Contains(msg, "eof"):
		return ErrProtocolMismatch

	// Host/port unreachable
	case strings.Contains(msg, "connection refused") ||
		strings.Contains(msg, "no route to host") ||
		strings.Contains(msg, "no such host") ||
		strings.Contains(msg, "network is unreachable"):
		return ErrConnectionRefused

	// Auth (paho returns the CONNACK reason phrase in the error string)
	case strings.Contains(msg, "bad user name or password") ||
		strings.Contains(msg, "not authorised") ||
		strings.Contains(msg, "not authorized") ||
		strings.Contains(msg, "connack") && (strings.Contains(msg, "4") || strings.Contains(msg, "5")):
		return ErrAuthFailed

	// Timeouts
	case strings.Contains(msg, "timeout") ||
		strings.Contains(msg, "i/o timeout") ||
		strings.Contains(msg, "deadline exceeded"):
		return ErrTimeout

	default:
		return ErrNetwork
	}
}
