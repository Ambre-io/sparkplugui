package backend

import (
	"context"
	MQTT "github.com/eclipse/paho.mqtt.golang"
)

// App struct
type App struct {
	context    context.Context
	MQTTCLIENT MQTT.Client
	QUEUE      chan Payload
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// Startup is called when the app starts. The context is saved, so we can call the runtime methods
func (a *App) Startup(context context.Context) {
	a.context = context
	a.MQTTCLIENT = MQTT.NewClient(MQTT.NewClientOptions())
	a.QUEUE = make(chan Payload)
}
