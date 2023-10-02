import {connectAsync, MqttClient} from 'mqtt';
import {decodePayload} from "sparkplug-payload/lib/sparkplugbpayload";
import {PubSubEngine} from 'graphql-subscriptions/dist/pubsub-engine';
import {PubSubAsyncIterator} from 'graphql-subscriptions/dist/pubsub-async-iterator';
import {SubscriptionsType, SubscriptionType} from "~/utils/types";
import {utils} from "~/utils/utils";
import {constants} from "~/utils/constants";


export class MQTTAsyncIterator implements PubSubEngine {

    // ******************************************
    // * Fields
    // ******************************************

    public mqttClient: MqttClient;
    private subscriptions: SubscriptionsType;
    private subId: number;

    // ******************************************
    // * Constructor
    // ******************************************

    constructor(brokerUrl: string) {
        this.initMQTTClient(brokerUrl).catch((e: any) => console.log('Error: MQTT client not initialized', e));
        this.subscriptions = [];
        this.subId = 0;
    }

    // ******************************************
    // * PubSubEngine methods implementations
    // ******************************************

    // Main function that wrap this PubSubEngine implementation to return an AsyncIterator (MQTTAsyncIterator)
    public asyncIterator<T>(topic: string | string[]): AsyncIterator<T> {
        return new PubSubAsyncIterator<T>(this, topic);
    }

    // Publish payload on MQTT topic
    public publish(topic: string, payload: any): Promise<void> {
        return new Promise(_ => this.mqttClient.publish(topic, payload));
    }

    // Subscribe to a MQTT topic
    public subscribe(topic: string, onMessage: Function, options: Object): Promise<number> {
        const id = this.subId;
        this.subId = this.subId + 1;
        this.subscriptions = [...this.subscriptions, {id, topic, onMessage}];

        return new Promise<number>((resolve, reject) => {
            try {
                this.mqttClient.subscribe(topic);
                resolve(id);
                console.log('subscribed to', topic)
            } catch (e) {
                console.log(`Error: when subscribing topic=${topic}`, reject(e));
            }
        });
    }

    // Unsubscribe from a MQTT topic
    public unsubscribe(subId: number): any {
        console.log('MQTTAsyncIterator.unsubscribe');

        const value = utils.findID(this.subscriptions, subId);
        if (value === undefined) return;

        try {
            this.mqttClient.unsubscribe(value.topic)
            console.log('unsubscribe to', value.topic);
        } catch (e) {
            console.log(`Error: when unsubscribing topic=${value.topic}`, e);
        }
    }

    // ******************************************
    // * Homemade methods
    // ******************************************

    // MQTT Client initialization
    private async initMQTTClient(brokerUrl: string): Promise<void> {
        this.mqttClient = await connectAsync(brokerUrl);
        try {
            this.mqttClient.publish(constants.topicSparkplugUIInit, constants.messageSparkplugUIInit);
            this.mqttClient.on(constants.message, this.onMessage.bind(this));
        } catch (e) {
            console.log('Error: publish test', e);
        }
    }

    // MQTT Client onMessage override
    private onMessage(topic: string, payload: Buffer): void {
        console.log('MQTTAsyncIterator.onMessage');

        let decodedMessage: string;
        try {
            decodedMessage = decodePayload(payload).toString();
        } catch {
            decodedMessage = payload.toString();
        }

        console.log('topic:', topic, 'payload:', decodedMessage);

        this.subscriptions.map((subscription: SubscriptionType) => subscription.onMessage(decodedMessage));
    }
}
