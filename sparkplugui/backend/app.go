/*
SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
@author guiklimek

* This program and the accompanying materials are made available under the
* terms of the GNU GENERAL PUBLIC LICENSE which is available at
* https://ambre.io/
*/

package backend

import (
	"context"
	MQTT "github.com/eclipse/paho.mqtt.golang"
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
