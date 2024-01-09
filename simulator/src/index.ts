import {connectAsync, MqttClient} from 'mqtt';
import {encodePayload, UPayload} from "sparkplug-payload/lib/sparkplugbpayload";

import SETTINGS from "../../settings.json";
import {utils} from "./utils";

let nbNodes: number = 4;
let nbDevices: number = 4;
if (process.argv.length > 3) {
    let nbNodes: number = parseInt(process.argv[2]);
    let nbDevices: number = parseInt(process.argv[3]);
}

// Default MQTT broker url
let brokerUrl: string = `${SETTINGS.mqttServer.mqtt}://${SETTINGS.mqttServer.host}:${SETTINGS.mqttServer.port}`;
const topicBase: string = 'spBv1.0/GROUPID';


(async () => {

    // ******************************************
    // * MQTT Client
    // ******************************************
    const mqttClient: MqttClient = await connectAsync(brokerUrl);

    // ******************************************
    // * Nodes publish
    // ******************************************
    for await (const iNode of utils.range(nbNodes)) {

        let nodeTopic: string = `${topicBase}/${utils.euidGenerator()}`;

        const payload: UPayload = {
            timestamp: new Date().getTime(),
            metrics: [{
                name: `Node${iNode}`,
                type: 'String',
                value: 'PoUeT pOuEt',
                properties: {Unit: {value: 'pp', type: 'String'}},
            }]
        };
        const encodedPayload: Uint8Array = encodePayload(payload);

        console.log('Publish on', nodeTopic);
        mqttClient.publish(nodeTopic, Buffer.from(encodedPayload));
        await utils.sleep(250);

        // ******************************************
        // * Devices publish
        // ******************************************
        let value: boolean = true;

        for await (const iDevice of utils.range(nbDevices)) {

            const deviceTopic: string = `${nodeTopic}/${utils.euidGenerator()}`;

            const payload: UPayload = {
                timestamp: new Date().getTime(),
                metrics: [{
                    name: `Device${iDevice} Boolean`,
                    type: 'Boolean',
                    value,
                }, {
                    name: `Device${iDevice} String`,
                    type: 'String',
                    value: `[${iDevice}]`,
                }]
            };
            value = !value;
            const encodedPayload: Uint8Array = encodePayload(payload);

            console.log('Publish on', deviceTopic);
            mqttClient.publish(deviceTopic, Buffer.from(encodedPayload));
            await utils.sleep(250);
        }
    }
    await mqttClient.endAsync();
})();
