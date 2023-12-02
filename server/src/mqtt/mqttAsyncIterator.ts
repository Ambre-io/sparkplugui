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
        this.initMQTTClient(brokerUrl).catch(
            (e: any) => console.error('Error: MQTT client not initialized', e)
        );
        this.subscriptions = [];
        this.subId = 0;
    }

    // ******************************************
    // * PubSubEngine methods implementations
    // ******************************************

    // Main function that wrap this PubSubEngine implementation to return an AsyncIterator
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
                console.debug('subscribed to', topic);
            } catch (e) {
                reject(id);
                console.error(`Error: when subscribing topic=${topic}`, e);
            }
        });
    }

    // Unsubscribe from a MQTT topic
    public unsubscribe(subId: number): boolean {
        const value = utils.findID(this.subscriptions, subId);
        if (value === undefined) return true;
        try {
            this.mqttClient.unsubscribe(value.topic);
            console.debug('unsubscribe to', value.topic);
            return true
        } catch (e) {
            console.error(`Error: when unsubscribing topic=${value.topic}`, e);
            return false
        }
    }

    // ******************************************
    // * Homemade methods
    // ******************************************

    // MQTT Client initialization
    private async initMQTTClient(brokerUrl: string): Promise<void> {
        this.mqttClient = await connectAsync(brokerUrl);
        try {
            this.mqttClient.on(constants.message, this.onMessage.bind(this));
        } catch (e) {
            console.error('Error: publish test', e);
        }
    }

    // MQTT Client onMessage override
    private onMessage(topic: string, message: Buffer): void {
        let decodedMessage: string;
        try {
            decodedMessage = decodePayload(message).toString();
        } catch {
            decodedMessage = message.toString();
        }
        // TODO Maybe add a condition on topic === subscription.topic
        this.subscriptions.map(
            (subscription: SubscriptionType) => subscription.onMessage({topic, message: decodedMessage})
        );
    }

    public unsub(topic: string): boolean {
        const sub = this.subscriptions.find(
            (subscription: SubscriptionType) => subscription.topic === topic
        );
        if (sub === undefined) return true;
        return this.unsubscribe(sub.id);
    }
}
