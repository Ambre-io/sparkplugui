package backend

import (
	"fmt"
	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/golang/protobuf/proto"
	"sparkplugui/backend/sproto"
	"time"
)

var MQTTCLIENT = MQTT.NewClient(MQTT.NewClientOptions())

func OnMessageReceived(client MQTT.Client, message MQTT.Message) {
	// FEED THE QUEUE
	payload := sproto.Payload{}
	err := proto.Unmarshal(message.Payload(), &payload)
	decoded := ""
	if err != nil {
		decoded = string(message.Payload())
	} else {
		decoded = payload.String()
	}
	fmt.Printf(decoded)
	QUEUE <- Payload{
		Topic:     message.Topic(),
		Message:   decoded,
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

	MQTTCLIENT.Subscribe(data.Topic, 0, OnMessageReceived)

	return connected
}

func (a *App) Disconnect() bool {
	//disconnected := true
	MQTTCLIENT.Disconnect(250)
	return true
}
