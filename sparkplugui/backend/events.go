package backend

import "fmt"

func (a *App) MQTTPayload() *Payload {
	// CONSUME THE QUEUE
	payload := <-QUEUE
	fmt.Printf("###### EVENT => topic=%s Message=%s Timestamp=%d\n", payload.Topic, payload.Message, payload.Timestamp)
	return &payload
}
