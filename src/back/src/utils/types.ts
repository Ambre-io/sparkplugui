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

export interface SubscriptionType {
    id: number;
    topic: string;
    onMessage: Function;
}

export interface SubscriptionOnMessageType {
    topic: string;
    message: string;
}

export type SubscriptionsType = Array<SubscriptionType>;

export interface MessageType {
    topic: string;
    payload: string;
}
