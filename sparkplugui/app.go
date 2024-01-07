package main

import (
	"context"
	"fmt"
	MQTT "github.com/eclipse/paho.mqtt.golang"
	"time"
)

// ******************************************
// * Wails App
// ******************************************

// App struct
type App struct {
	context context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved, so we can call the runtime methods
func (a *App) startup(context context.Context) {
	a.context = context
}

// ******************************************
// * SparkpluGUI logic
// * TODO tls https://github.com/eclipse/paho.mqtt.golang/blob/master/cmd/ssl/main.go
// ******************************************

// TYPES

type Payload struct {
	Topic     string `json:"topic"`
	Message   string `json:"message"`
	Timestamp int64  `json:"timestamp"`
}

type MQTTClientData struct {
	Host     string `json:"host"`
	Port     string `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
	Topic    string `json:"topic"`
}

// GLOBALS

var MQTTCLIENT = MQTT.NewClient(MQTT.NewClientOptions())

var QUEUE = make(chan Payload)

// METHODS

func (a *App) MQTTPayload() *Payload {
	// CONSUME THE QUEUE
	payload := <-QUEUE
	fmt.Printf("###### EVENT => topic=%s Message=%s Timestamp=%d\n", payload.Topic, payload.Message, payload.Timestamp)
	return &payload
}

func onMessageReceived(client MQTT.Client, message MQTT.Message) {
	// FEED THE QUEUE
	fmt.Printf("###### MQTT CALLBACK => topic=%s Message=%s\n", message.Topic(), message.Payload())
	QUEUE <- Payload{
		Topic:     message.Topic(),
		Message:   string(message.Payload()),
		Timestamp: time.Now().Unix(),
	}
}

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

	MQTTCLIENT.Subscribe(data.Topic, 0, onMessageReceived)

	return connected
}

func (a *App) Disconnect() bool {
	//disconnected := true
	MQTTCLIENT.Disconnect(250)
	return true
}
