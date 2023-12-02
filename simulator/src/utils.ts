export const utils = {
    range: (start: number, stop?: number | undefined, step?: number | undefined): number[] => {
        // Python range implementation based on https://stackoverflow.com/a/8273091
        if (stop === undefined) {
            stop = start;
            start = 0;
        }

        if (step === undefined) step = 1;

        if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) return [];

        const result: number[] = [];
        for (let i: number = start; step > 0 ? i < stop : i > stop; i += step) {
            result.push(i);
        }

        return result;
    },
    euidGenerator: (): string => {
        const euidAlphabet = [...utils.range(10), 'a', 'b', 'c', 'd', 'e', 'f'];
        let euid: string = '';
        for (const _ of utils.range(16)) {
            euid = `${euid}${euidAlphabet[Math.floor(Math.random() * euidAlphabet.length)]}`;
        }
        return euid;
    },
    sleep: (ms: number) => new Promise((r) => setTimeout(r, ms))
};
