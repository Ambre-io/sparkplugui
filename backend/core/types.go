/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */

package core

// Error codes sent to the frontend for precise toast messages.
const (
	ErrHostEmpty         = "errHostEmpty"
	ErrTopicEmpty        = "errTopicEmpty"
	ErrTLSConfig         = "errTLSConfig"
	ErrProtocolMismatch  = "errProtocolMismatch"
	ErrConnectionRefused = "errConnectionRefused"
	ErrAuthFailed        = "errAuthFailed"
	ErrTimeout           = "errTimeout"
	ErrTLSHandshake      = "errTLSHandshake"
	ErrSubscribe         = "errSubscribe"
	ErrNetwork           = "errNetwork"
)

type MQTTMessage struct {
	Topic     string `json:"topic"`
	Payload   string `json:"payload"`
	Timestamp int64  `json:"timestamp"`
}

// Protocol values: "tcp", "ssl", "ws", "wss"
type MQTTSetup struct {
	Host      string `json:"host"`
	Port      string `json:"port"`
	Protocol  string `json:"protocol"`
	Topic     string `json:"topic"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	CACrt     string `json:"cacrt"`
	ClientCrt string `json:"clientcrt"`
	ClientKey string `json:"clientkey"`
}

// ConnectResult is returned by CmdConnect so the frontend can show a precise error message.
// Ok=true means success. On failure Ok=false and ErrorCode is one of the Err* constants above.
type ConnectResult struct {
	Ok        bool   `json:"ok"`
	ErrorCode string `json:"errorCode"`
}
