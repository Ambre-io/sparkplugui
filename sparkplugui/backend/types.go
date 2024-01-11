package backend

type MQTTClientData struct {
	Host     string `json:"host"`
	Port     string `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
	Topic    string `json:"topic"`
}

type MQTTPayload struct {
	Topic     string `json:"topic"`
	Message   string `json:"message"`
	Timestamp int64  `json:"timestamp"`
}
