import {MQTTDataType} from "~/utils/types";

export const mqttActions = {
    publish: async () => {
        // fresh payload with metrics update
        // const payload: UPayload = utils.sparkplugPayload();
        // payload.metrics = [{
        //     ...metricsMapping.metric,
        //     value: JSON.stringify({[constants.system]: payloadSettings})
        // }];
        // // or
        // payload.metrics = [{...metric, value: value}];
        //
        // // encode
        // const encodedPayload: Uint8Array = encodePayload(payload);
        // // publish
        // mqttClient.publish(topic, Buffer.from(encodedPayload));
    },
    subscribe: (MQTTData: MQTTDataType) => {
        // Sparkplug client definition
        // import {AsyncMqttClient, connect} from "async-mqtt";
        // export const mqttClient: AsyncMqttClient = connect(CONFIG.mqtt.brokerUrl);
        // mqttClient.publish('MQTT/connected/bwoah', 'test');
        return true
    }
}
