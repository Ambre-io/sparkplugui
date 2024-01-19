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

type MQTTMessage struct {
	Topic     string `json:"topic"`
	Payload   string `json:"payload"`
	Timestamp int64  `json:"timestamp"`
}

type MQTTTLSCertificates struct {
	// FQN = Fully Qualified Name, in this case I mean the path and the filename with extension
	FQNCACrt     string `json:"fqncacrt"`
	FQNClientCrt string `json:"fqnclientcrt"`
	FQNClientKey string `json:"fqnclientkey"`
}

type MQTTSetup struct {
	Host         string              `json:"host"`
	Port         string              `json:"port"`
	Username     string              `json:"username"`
	Password     string              `json:"password"`
	Topic        string              `json:"topic"`
	Certificates MQTTTLSCertificates `json:"certificates"`
}
