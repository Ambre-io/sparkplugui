import {mqttActions} from "~/mqtt/mqttActions";

export const resolvers = {
    // Query: {
    //
    // },
    Mutation: {
        postMQTTData: async (_: any, data: any) => {
            return mqttActions.subscribe(data);
        },
    }
};
