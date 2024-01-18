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

func (a *App) CmdConnect(data MQTTClientData) bool {

	connected := true

	// MQTT client options
	address := fmt.Sprintf("tcp://%s:%s", data.Host, data.Port)
	options := MQTT.NewClientOptions().AddBroker(address).SetClientID("sparkplugui")
	options.SetCleanSession(true)

	// MQTT declaration
	a.MQTTCLIENT = MQTT.NewClient(options)
	if token := a.MQTTCLIENT.Connect(); token.Wait() && token.Error() != nil {
		connected = false
		fmt.Printf("Error: %s\n", token.Error())
	}

	a.MQTTCLIENT.Subscribe(data.Topic, 0, func(_ MQTT.Client, message MQTT.Message) {
		go func() {
			decoded, timestamp := a.decode(message.Payload())
			a.pushMessage(message.Topic(), decoded, timestamp)
		}()
	})

	return connected
}

func (a *App) CmdDisconnect() bool {
	a.MQTTCLIENT.Disconnect(250)
	return true
}
