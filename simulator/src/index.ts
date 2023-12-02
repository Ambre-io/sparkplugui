import {connectAsync, MqttClient} from 'mqtt';
import {encodePayload, UPayload} from "sparkplug-payload/lib/sparkplugbpayload";

import SETTINGS from "../../settings.json";
import {utils} from "./utils";


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
    let nodeTopic: string = `${topicBase}/${utils.euidGenerator()}`;

    const payload: UPayload = {
        timestamp: new Date().getTime(),
        metrics: [{
            name: 'Node',
            type: 'String',
            value: 'PoUeT pOuEt',
            properties: {Unit: {value: 'pp', type: 'String'}},
        }]
    };
    const encodedPayload: Uint8Array = encodePayload(payload);

    mqttClient.publish(nodeTopic, Buffer.from(encodedPayload));
    await utils.sleep(1000);

    // ******************************************
    // * Devices publish
    // ******************************************
    let value: boolean = true;

    for await (const i of utils.range(4)) {

        const deviceTopic: string = `${nodeTopic}/${utils.euidGenerator()}`;

        const payload: UPayload = {
            timestamp: new Date().getTime(),
            metrics: [{
                name: `Device${i} Boolean`,
                type: 'Boolean',
                value,
            }, {
                name: `Device${i} String`,
                type: 'String',
                value: `[${i * i + i}]`,
            }]
        };
        value = !value;
        const encodedPayload: Uint8Array = encodePayload(payload);

        mqttClient.publish(deviceTopic, Buffer.from(encodedPayload));
        await utils.sleep(1000);
    }
})();
