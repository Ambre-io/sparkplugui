package main

import (
	"context"
	"fmt"
	MQTT "github.com/eclipse/paho.mqtt.golang"
)

// ******************************************
// * Wails App
// ******************************************

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// ******************************************
// * SparkpluGUI business
// ******************************************

type MQTTClientData struct {
	Host     string `json:"host"`
	Port     string `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
	Topic    string `json:"topic"`
}

var MQTTCLIENT = MQTT.NewClient(MQTT.NewClientOptions())

func (a *App) Connect(data MQTTClientData) bool {

	connected := true

	// MQTT client options
	// TODO get params from front
	address := fmt.Sprintf("tcp://%s:%s", data.Host, data.Port)
	options := MQTT.NewClientOptions().AddBroker(address).SetClientID("sparkplugui")
	options.SetCleanSession(true)

	// MQTT declaration
	MQTTCLIENT = MQTT.NewClient(options)
	if token := MQTTCLIENT.Connect(); token.Wait() && token.Error() != nil {
		connected = false
		fmt.Printf("Error: %s\n", token.Error())
	}

	MQTTCLIENT.Subscribe(data.Topic, 0, func(client MQTT.Client, msg MQTT.Message) {
		fmt.Printf("TOPIC: %s\n", msg.Topic())
		fmt.Printf("MSG: %s\n", msg.Payload())
	})

	return connected
}

func (a *App) Disconnect() bool {
	//disconnected := true
	MQTTCLIENT.Disconnect(250)
	return true
}
