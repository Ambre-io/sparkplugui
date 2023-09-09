

export const actions = {
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
    subscribe: async () => {

    }
}
