/*
SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT.
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
	"time"
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

func (a *App) EvtPayload() *MQTTMessage {
	return a.popMessage()
}

// ******************************************
// * PRIVATE METHODS
// ******************************************

func (a *App) decode(payload []byte) (string, int64) {
	decoded := ""
	timestamp := int64(0)

	p := sparkplug.Payload{}
	err := p.DecodePayload(payload)

	if err == nil { // sparkplug
		pjson, _ := json.Marshal(p.Metrics)
		decoded = string(pjson)
		timestamp = p.Timestamp.Unix()
	} else {
		decoded = string(payload)
		timestamp = time.Now().Unix()
	}

	return decoded, timestamp
}

func (a *App) pushMessage(topic string, payload string, timestamp int64) {
	a.QUEUE <- MQTTMessage{
		Topic:     topic,
		Payload:   payload,
		Timestamp: timestamp,
	}
}

func (a *App) popMessage() *MQTTMessage {
	p := <-a.QUEUE
	return &p
}
