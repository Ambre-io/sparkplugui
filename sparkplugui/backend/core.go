package backend

import (
	"fmt"
	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/golang/protobuf/proto"
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

	a.MQTTCLIENT.Subscribe(data.Topic, 0, a.onMessageReceived)

	return connected
}

func (a *App) CmdDisconnect() bool {
	//disconnected := true
	a.MQTTCLIENT.Disconnect(250)
	return true
}

func (a *App) EvtPayload() *Payload {
	p := <-a.QUEUE
	return &p
}

// ******************************************
// * PRIVATE METHODS
// ******************************************

func (a *App) feedTheQueue(message MQTT.Message) {
	payload := sparkplug.Payload{}
	err := proto.Unmarshal(message.Payload(), &payload)
	decoded := ""
	if err != nil {
		decoded = string(message.Payload())
	} else {
		decoded = payload.String()
	}
	a.QUEUE <- Payload{
		Topic:     message.Topic(),
		Message:   decoded,
		Timestamp: time.Now().Unix(),
	}
}

func (a *App) onMessageReceived(_ MQTT.Client, message MQTT.Message) {
	go a.feedTheQueue(message)
}
