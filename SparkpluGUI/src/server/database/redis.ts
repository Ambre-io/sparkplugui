import {createClient} from 'redis';

import SETTINGS from '../../../settings.json';


let redisClient: any = undefined;


export const redis = {
    createClient: async () => {
        // usage: https://www.npmjs.com/package/redis?activeTab=readme#usage
        const url = `${SETTINGS.redisServer.redis}://${SETTINGS.redisServer.host}:${SETTINGS.redisServer.port}`;
        redisClient = createClient({url});
        redisClient.on('error', (e: any) => console.error('Redis client error', e));
        redisClient.on('ready', () => console.log(`💾 Redis client ready       : 🤩 ${url}`));
        await redisClient.connect();
    },
    set: async (k: string, v: any) => {
        if (redisClient === undefined) {
            console.error(`Error: cannot set ${k}, redis client is not initialized`);
            return;
        }
        return await redisClient.set(k, v);
    },
    get: async (k: string) => {
        if (redisClient === undefined) {
            console.error(`Error: cannot get ${k}, redis client is not initialized`);
            return;
        }
        return await redisClient.get(k);
    },
    disconnect: async () => {
        if (redisClient === undefined) return;
        await redisClient.disconnect();
    }
};
