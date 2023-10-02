import SETTINGS from '../../../../settings.json';
import {constants} from "~/utils/constants";
import {MQTTAsyncIterator} from "~/mqtt/mqttAsyncIterator";


const pubsub: MQTTAsyncIterator = new MQTTAsyncIterator(
    `${SETTINGS.defaultMQTTBroker.mqtt}://${SETTINGS.defaultMQTTBroker.host}:${SETTINGS.defaultMQTTBroker.port}`
);


export const resolvers = {
    Mutation: {
        postMQTTData: async (_: any, data: any) => {
            console.log('postMQTTData', data);
            return {isOK: true};
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
