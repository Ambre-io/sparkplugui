/*
SparkpluGUI - Clear software that decodes and presents IoT MQTT Sparkplug messages
@author guiklimek

* This program and the accompanying materials are made available under the
* terms of the GNU GENERAL PUBLIC LICENSE which is available at
* https://ambre.io/
*/

package backend

import (
	"encoding/json"
	"fmt"
	MQTT "github.com/eclipse/paho.mqtt.golang"
	"sparkplugui/backend/sparkplug"
)

// ******************************************
// * METHODS
// ******************************************

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

	a.MQTTCLIENT.Subscribe(data.Topic, 0, a.onMessageReceived)

	return connected
}

func (a *App) CmdDisconnect() bool {
	//disconnected := true
	a.MQTTCLIENT.Disconnect(250)
	return true
}

func (a *App) EvtPayload() *MQTTPayload {
	p := <-a.QUEUE
	return &p
}

// ******************************************
// * PRIVATE METHODS
// ******************************************

func (a *App) feedTheQueue(message MQTT.Message) {

	p := sparkplug.Payload{}
	err := p.DecodePayload(message.Payload())

	decoded := ""
	if err != nil {
		decoded = string(message.Payload())
	} else {
		pjson, _ := json.Marshal(p.Metrics)
		decoded = string(pjson)
	}

	a.QUEUE <- MQTTPayload{
		Topic:     message.Topic(),
		Message:   decoded,
		Timestamp: p.Timestamp.Unix(),
	}
}

func (a *App) onMessageReceived(_ MQTT.Client, message MQTT.Message) {
	go a.feedTheQueue(message)
}
