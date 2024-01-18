/*
SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
@author guiklimek

* This program and the accompanying materials are made available under the
* terms of the GNU GENERAL PUBLIC LICENSE which is available at
* https://ambre.io/
*/

package core

import (
	"context"
	"encoding/json"
	MQTT "github.com/eclipse/paho.mqtt.golang"
	"sparkplugui/backend/sparkplug"
	"time"
)

// App struct
type App struct {
	context    context.Context
	MQTTCLIENT MQTT.Client
	QUEUE      chan MQTTMessage
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// Startup is called when the app starts. The context is saved, so we can call the runtime methods
func (a *App) Startup(context context.Context) {
	a.context = context
	a.MQTTCLIENT = MQTT.NewClient(MQTT.NewClientOptions())
	a.QUEUE = make(chan MQTTMessage)
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
