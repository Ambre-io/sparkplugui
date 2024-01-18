/*
SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
@author guiklimek

* This program and the accompanying materials are made available under the
* terms of the GNU GENERAL PUBLIC LICENSE which is available at
* https://ambre.io/
*/

package core

func (a *App) EvtPayload() *MQTTMessage {
	return a.popMessage()
}
