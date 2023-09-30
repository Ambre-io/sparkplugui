import {PubSubEngine} from 'graphql-subscriptions/dist/pubsub-engine';
import {PubSubAsyncIterator} from 'graphql-subscriptions/dist/pubsub-async-iterator';
import {AsyncMqttClient, connect} from 'async-mqtt';
import {decodePayload, UPayload} from "sparkplug-payload/lib/sparkplugbpayload";
import {SubscriptionsType} from "~/utils/types";


export class MQTTAsyncIterator implements PubSubEngine {

    public mqttClient: AsyncMqttClient;
    private subscriptions: SubscriptionsType;
    private subId: number;

    constructor(brokerUrl: string) {
        this.mqttClient = connect(brokerUrl);
        this.mqttClient.publish('COUCOU/PETITE/PERRUCHE', 'ouais ouais ouais').catch((e: any) => console.log(e));
        this.mqttClient.on('message', this.onMessage.bind(this));
        this.subscriptions = {};
        this.subId = 0;
    }

    asyncIterator<T>(topic: string | string[]): AsyncIterator<T> {
        return new PubSubAsyncIterator<T>(this, topic);
    }

    publish(topic: string, payload: any): Promise<void> {
        console.log('MQTTAsyncIterator.publish');
        return this.mqttClient.publish(topic, payload);
    }

    subscribe(topic: string, onMessage: Function, options: Object): Promise<number> {
        console.log('MQTTAsyncIterator.subscribe');
        const id = this.subId++;
        this.subscriptions[id] = [topic, onMessage];
        return new Promise<number>((resolve, reject) => {
            this.mqttClient.subscribe(topic, {qos: 1}).then(
                (res: any) => {
                    resolve(id);
                    console.log('subscribed to', res)
                }
            ).catch(
                (e: any) => console.log(`Error: when subscribing topic=${topic}`, reject(e))
            );
        });
    }

    unsubscribe(subId: number): any {
        console.log('MQTTAsyncIterator.unsubscribe');
        const value = this.subscriptions[subId] || [];
        if (value.length < 1) return;
        this.mqttClient.unsubscribe(value[0]).then(
            (res: any) => console.log('unsubscribe to', res)
        ).catch(
            (e: any) => console.log(`Error: when unsubscribing topic=${value[0]}`, e)
        );
    }

    // Binded function to the MQTT Client onMessage
    private onMessage(topic: string, message: Buffer) {
        console.log('MQTTAsyncIterator.onMessage');
        let decodedMessage: UPayload | string;
        try {
            decodedMessage = decodePayload(message);
        } catch (e) {
            decodedMessage = message.toString();
        }
        Object.values(this.subscriptions).map((value) => {
            value[1](decodedMessage)
        });
    }
}
