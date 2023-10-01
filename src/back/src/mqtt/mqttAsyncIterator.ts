import {PubSubEngine} from 'graphql-subscriptions/dist/pubsub-engine';
import {PubSubAsyncIterator} from 'graphql-subscriptions/dist/pubsub-async-iterator';
import {connectAsync, MqttClient} from 'mqtt';
import {decodePayload, UPayload} from "sparkplug-payload/lib/sparkplugbpayload";
import {MessageType, SubscriptionsType} from "~/utils/types";


export class MQTTAsyncIterator implements PubSubEngine {

    public mqttClient: MqttClient;
    private subscriptions: SubscriptionsType;
    private subId: number;

    constructor(brokerUrl: string) {
        this.initMQTTClient(brokerUrl).catch((e: any) => console.log('Error: MQTT client not initialized', e));
        this.subscriptions = {};
        this.subId = 0;
    }

    private async initMQTTClient(brokerUrl: string): Promise<void> {
        this.mqttClient = await connectAsync(brokerUrl);
        try {
            this.mqttClient.publish('COUCOU/PETITE/PERRUCHE', 'ouais ouais ouais');
            this.mqttClient.on('message', (topic, payload) => this.onMessage(topic, payload));
        } catch (e) {
            console.log('Error: publish test', e);
        }
    }

    public asyncIterator<T>(topic: string | string[]): AsyncIterator<T> {
        return new PubSubAsyncIterator<T>(this, topic);
    }

    public publish(topic: string, payload: any): Promise<void> {
        return new Promise(_ => this.mqttClient.publish(topic, payload));
    }

    public subscribe(topic: string, onMessage: Function, options: Object): Promise<number> {
        const id = this.subId;
        this.subId = this.subId + 1;
        this.subscriptions = {...this.subscriptions, [id]: [topic, onMessage]};

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

    public unsubscribe(subId: number): any {
        console.log('MQTTAsyncIterator.unsubscribe');

        const value = this.subscriptions[subId] || [];

        if (value.length < 1) return;

        try {
            this.mqttClient.unsubscribe(value[0])
            console.log('unsubscribe to', value[0]);
        } catch (e) {
            console.log(`Error: when unsubscribing topic=${value[0]}`, e);
        }
    }

    // Binded function to the MQTT Client onMessage
    private onMessage(topic: string, payload: Buffer): void {
        console.log('MQTTAsyncIterator.onMessage');

        let decodedMessage: string;
        try {
            decodedMessage = decodePayload(payload).toString();
        } catch {
            decodedMessage = payload.toString();
        }

        console.log('topic:', topic, 'payload:', decodedMessage);

        Object.values(this.subscriptions).map((value) => value[1](decodedMessage));
    }
}
