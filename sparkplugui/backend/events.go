package backend

import (
	"fmt"
	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/golang/protobuf/proto"
	"sparkplugui/backend/sparkplug"
	"time"
)

// GLOBALS

var MQTTCLIENT = MQTT.NewClient(MQTT.NewClientOptions())
var QUEUE = make(chan Payload)

// METHODS

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

func (a *App) MQTTPayload() *Payload {
	// CONSUME THE QUEUE
	payload := <-QUEUE
	fmt.Printf("###### EVENT => topic=%s Message=%s Timestamp=%d\n", payload.Topic, payload.Message, payload.Timestamp)
	return &payload
}

// PRIVATE METHODS

func onMessageReceived(_ MQTT.Client, message MQTT.Message) {
	fmt.Printf("### OnMessageReceived => topic=%s Message=%s\n", message.Topic(), message.Payload())

	// FEED THE QUEUE
	payload := sparkplug.Payload{}
	err := proto.Unmarshal(message.Payload(), &payload)
	decoded := ""
	if err != nil {
		decoded = string(message.Payload())
	} else {
		decoded = payload.String()
	}
	QUEUE <- Payload{
		Topic:     message.Topic(),
		Message:   decoded,
		Timestamp: time.Now().Unix(),
	}
}
