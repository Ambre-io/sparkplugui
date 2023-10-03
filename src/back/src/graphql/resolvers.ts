import {constants} from "~/utils/constants";
import {queries} from "~/database/queries";
import SETTINGS from "../../../../settings.json";
import {MQTTAsyncIterator} from "~/mqtt/mqttAsyncIterator";


let brokerUrl: string = `${SETTINGS.mqttServer.mqtt}://${SETTINGS.mqttServer.host}:${SETTINGS.mqttServer.port}`;
const keys = [constants.mqttInformation.host, constants.mqttInformation.port];
const mqttInformation = queries.select(keys);
if (Object.keys(mqttInformation).length == keys.length) {
    brokerUrl = `${SETTINGS.mqttServer.mqtt}://${mqttInformation.host}:${mqttInformation.port}`;
}
let pubsub = new MQTTAsyncIterator(brokerUrl);


export const resolvers = {
    Mutation: {
        postMQTTData: async (_: any, data: any) => {
            const isOK: boolean = queries.save(data);
            // TODO postMQTTData with new different information => restart mqtt client with new info
            if (isOK) pubsub = new MQTTAsyncIterator(`${SETTINGS.mqttServer.mqtt}://${data.host}:${data.port}`);
            return {isOK};
        }
    },
    Subscription: {
        messageReceived: {
            // https://www.apollographql.com/docs/apollo-server/data/subscriptions#resolving-a-subscription
            subscribe: () => pubsub.asyncIterator(constants.pubsubTopicTest),
            resolve: (payload: any) => {
                return {topic: constants.pubsubTopicTest, payload};
            }
        }
    }
};
