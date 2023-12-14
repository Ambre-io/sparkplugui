import {redis} from "./redis";


export const queries = {
    save: (obj: any): boolean => {
        let isOK = true;
        Object.entries(obj).map(([k, v]) => {
            redis.set(k, v).catch((e: any) => {
                isOK = false;
                console.error('Error: cannot save in redis', e);
            });
        });
        return isOK;
    },
    select: (keys: string[]): any => {
        let data = {};
        keys.map((key: string) => {
            redis.get(key).then(
                (value: any) => data = {...data, [key]: value}
            ).catch(
                (e: any) => console.error('Error: cannot select from redis', e)
            );
        });
        return data;
    }
};
