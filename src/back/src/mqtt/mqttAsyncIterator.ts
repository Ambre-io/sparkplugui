import {PubSubEngine} from 'graphql-subscriptions/dist/pubsub-engine';
import {PubSubAsyncIterator} from 'graphql-subscriptions/dist/pubsub-async-iterator';
import {AsyncMqttClient, connect} from 'async-mqtt';


const mqttClient: AsyncMqttClient = connect("tcp://127.0.0.1:1883");
mqttClient.publish('COUCOU/PETITE/PERRUCHE', 'ouais ouais ouais').catch((e: any) => console.log(e));


export class MQTTAsyncIterator implements PubSubEngine {
    asyncIterator<T>(topic: string | string[]): AsyncIterator<T> {
        return new PubSubAsyncIterator<T>(this, topic);
    }

    publish(topic: string, payload: any): Promise<void> {
        console.log('MQTTAsyncIterator.publish');
        return mqttClient.publish(topic, payload);
    }

    subscribe(topic: string, onMessage: Function, options: Object): Promise<number> {
        console.log('MQTTAsyncIterator.subscribe');
        return new Promise<number>((resolve, reject) => {
            mqttClient.subscribe(topic, {qos: 1}
            ).then(
                (res: any) => console.log('subscribed to', res)
            ).catch(
                (e: any) => console.log('Error: when subscribing', e)
            );
        });
    }

    unsubscribe(subId: number): any {
        console.log('MQTTAsyncIterator.unsubscribe');
        // pouet
        // mqttClient.unsubscribe(topic);
    }
}
