import {MQTTAsyncIterator} from "~/mqtt/mqttAsyncIterator";
import {constants} from "~/utils/constants";


const pubsub = new MQTTAsyncIterator('mqtt://localhost:1883');


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
            subscribe: () => pubsub.asyncIterator(constants.pubsubTopicTest)
        }
    }
};
