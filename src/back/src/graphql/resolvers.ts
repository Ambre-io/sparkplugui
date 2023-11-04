import {constants} from "~/utils/constants";
import {queries} from "~/database/queries";
import SETTINGS from "../../../../settings.json";
import {MQTTAsyncIterator} from "~/mqtt/mqttAsyncIterator";
import * as console from "console";

// Default MQTT broker url
let brokerUrl: string = `${SETTINGS.mqttServer.mqtt}://${SETTINGS.mqttServer.host}:${SETTINGS.mqttServer.port}`;
// Database MQTT broker url
const keys = [constants.mqttInformation.host, constants.mqttInformation.port];
const mqttInformation = queries.select(keys);
if (Object.keys(mqttInformation).length == keys.length) {
    brokerUrl = `${SETTINGS.mqttServer.mqtt}://${mqttInformation.host}:${mqttInformation.port}`;
}
// MQTT client through the GraphQL PubSubEngine
let pubsub = new MQTTAsyncIterator(brokerUrl);
// MQTT current topic
let topic = constants.defaultTopic;
// the AsyncIterator from MQTTAsyncIterator
let iterator = pubsub.asyncIterator(topic);

export const resolvers = {
    Mutation: {
        postMQTTData: async (_: any, data: any) => {
            const isOK: boolean = queries.save(data);
            if (isOK) {
                pubsub.unsub(topic);
                pubsub = new MQTTAsyncIterator(`${SETTINGS.mqttServer.mqtt}://${data.host}:${data.port}`);
                topic = data.topic;
                iterator = pubsub.asyncIterator(topic);
            }
            return {isOK};
        }
    },
    Subscription: {
        messageReceived: {
            // https://www.apollographql.com/docs/apollo-server/data/subscriptions#resolving-a-subscription
            subscribe: () => iterator,
            resolve: (payload: any) => {
                return {topic, payload, timestamp: Date.now()};
            },
        }
    }
};
