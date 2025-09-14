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
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

// ******************************************
// * CONNECT
// ******************************************

func (a *App) CmdConnect(setup MQTTSetup) bool {

	// Check Host
	if setup.Host == "" {
		fmt.Printf("Error: Host is empty\n")
		return false
	}
	// Check Topic
	if setup.Topic == "" {
		fmt.Printf("Error: Topic is empty\n")
		return false
	}

	// Build address
	address := ""
	if setup.Port == "" {
		address = fmt.Sprintf("tcp://%s", setup.Host)
	} else {
		address = fmt.Sprintf("tcp://%s:%s", setup.Host, setup.Port)
	}

	// Build options
	options := MQTT.NewClientOptions()
	options.AddBroker(address)
	options.SetClientID(fmt.Sprintf("SparkpluGUI-%d", time.Now().UnixNano()))
	options.SetCleanSession(true)
	options.SetOrderMatters(false)       // allow out-of-order callback delivery
	options.SetMessageChannelDepth(1024) // bump internal inbound buffer (Paho)

	if setup.Username != "" {
		options.SetUsername(setup.Username)
	}
	if setup.Password != "" {
		options.SetPassword(setup.Password)
	}

	if setup.CACrt != "" && setup.ClientCrt != "" && setup.ClientKey != "" {
		tlsconfig := NewTLSConfig(setup)
		if tlsconfig != nil {
			options.SetTLSConfig(tlsconfig)
		}
	}

	// Connect client
	a.MQTTCLIENT = MQTT.NewClient(options)
	if token := a.MQTTCLIENT.Connect(); token.Wait() && token.Error() != nil {
		fmt.Printf("Error: %s\n", token.Error())
		return false
	}

	// Launch it
	a.init()
	a.stopWorker() // no-op if nil; ensures only one worker ever runs per connection
	a.startWorker()

	// Subscribe client
	token := a.MQTTCLIENT.Subscribe(setup.Topic, 0, func(_ MQTT.Client, message MQTT.Message) {
		select {
		case a.RAWMESSAGES <- message: // ok
		default: // FIFO full => drop
		}
	})
	if token.Wait() && token.Error() != nil {
		fmt.Printf("Subscribe error: %s\n", token.Error())
		return false
	}

	a.lastTopic = setup.Topic

	return true
}

// ******************************************
// * DISCONNECT
// ******************************************

func (a *App) CmdDisconnect() bool {
	if a.lastTopic != "" {
		a.MQTTCLIENT.Unsubscribe(a.lastTopic)
	}

	// Clean worker stop
	a.stopWorker()

	// Disconnect client
	a.MQTTCLIENT.Disconnect(250)
	return true
}
