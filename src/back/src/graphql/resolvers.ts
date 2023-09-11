import {mqttActions} from "~/mqtt/mqttActions";

export const resolvers = {
    // Query: {
    //
    // },
    Mutation: {
        postMQTTData: async (_: any, data: any) => {
            return mqttActions.subscribe(data);
        },
    },
    Subscription: { // TODO https://www.apollographql.com/docs/apollo-server/data/subscriptions/#resolving-a-subscription

    }
};
