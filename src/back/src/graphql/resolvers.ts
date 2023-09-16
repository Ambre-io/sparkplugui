import {mqttActions} from "~/mqtt/mqttActions";
import {pubsub} from "~/index";
import {constants} from "~/utils/constants";


export const resolvers = {
    Mutation: {
        postMQTTData: async (_: any, data: any) => {
            return mqttActions.subscribe(data);
        }
    },
    Subscription: {
        messageReceived: {
            // The AsyncIterator method will tell the MQTT client to listen for messages from the MQTT broker on the topic provided,
            // and wraps that listener in an AsyncIterator object.
            // When messages are received from the topic, those messages can be returned back to connected clients.
            // subscribe: () => pubsub.asyncIterator(constants.pubsubTopicTest)
            subscribe: async function* () {
                for await (const t of ['WAW/E8164/1', 'WAW/E8164/2', 'WAW/E8164/3']) {
                    yield {topic: t, payload: 'pouet'};
                }
            }
        }
    }
};
