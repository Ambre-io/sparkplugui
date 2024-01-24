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
	options.SetClientID("SparkpluGUI")
	options.SetCleanSession(true)

	if setup.Username != "" {
		options.SetUsername(setup.Username)
	}
	if setup.Password != "" {
		options.SetPassword(setup.Password)
	}

	if setup.Certificates.CACrt != "" && setup.Certificates.ClientCrt != "" && setup.Certificates.ClientKey != "" {
		// TODO catch error to return false
		tlsconfig := NewTLSConfig(MQTTTLSCertificates{
			CACrt:     setup.Certificates.CACrt,
			ClientCrt: setup.Certificates.ClientCrt,
			ClientKey: setup.Certificates.ClientKey,
		})
		options.SetTLSConfig(tlsconfig)
	}

	// Connect client
	a.MQTTCLIENT = MQTT.NewClient(options)
	if token := a.MQTTCLIENT.Connect(); token.Wait() && token.Error() != nil {
		fmt.Printf("Error: %s\n", token.Error())
		return false
	}

	// Subscribe client
	a.MQTTCLIENT.Subscribe(setup.Topic, 0, func(_ MQTT.Client, message MQTT.Message) {
		go func() {
			decoded, timestamp := a.decode(message.Payload())
			a.pushMessage(message.Topic(), decoded, timestamp)
		}()
	})

	return true
}

// ******************************************
// * DISCONNECT
// ******************************************

func (a *App) CmdDisconnect() bool {
	a.MQTTCLIENT.Disconnect(250)
	return true
}
