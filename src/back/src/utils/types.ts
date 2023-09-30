// ******************************************
// * MQTT Data
// * TODO @@@ generate it from graphql schema
// ******************************************
export interface MQTTDataType {
    host: string;
    port: string;
    username: string;
    password: string;
    topic: string;
}

export type SubscriptionsType = Record<number, [string, Function]>;
