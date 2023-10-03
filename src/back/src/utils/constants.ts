// Internal logic constants:
// They are namespaced and the only source of truth, which strengthens the application overall


export const constants: any = {
    pubsubTopicTest: 'OMG/FIRST/TOPIC',
    topicSparkplugUIInit: 'SPARKPLUGUI/INIT',
    messageSparkplugUIInit: "Successfully connected to the MQTT broker",
    message: 'message',
    mqttInformation: {
        host: 'host',
        port: 'port',
        username: 'username',
        password: 'password',
        topic: 'topic',
    }
};
