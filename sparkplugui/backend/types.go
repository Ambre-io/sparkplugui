/*
SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
@author guiklimek

* This program and the accompanying materials are made available under the
* terms of the GNU GENERAL PUBLIC LICENSE which is available at
* https://ambre.io/
*/

package backend

type MQTTClientData struct {
	Host     string `json:"host"`
	Port     string `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
	Topic    string `json:"topic"`
}

type MQTTMessage struct {
	Topic     string `json:"topic"`
	Payload   string `json:"payload"`
	Timestamp int64  `json:"timestamp"`
}
