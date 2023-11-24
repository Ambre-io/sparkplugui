// ******************************************
// * Utils
// ******************************************

export const utils: any = {
    // This should be array.includes('value') but it's to early to use (ES7)
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    includes: (value: any, array: Array<any>) => array.indexOf(value) !== -1,
    dateFrom: (timestamp: number): string => new Date(timestamp).toISOString()
}

// ******************************************
// * Own TypeScript
// ******************************************

declare global {
    interface Array<T> {

        last(): T;

        remove(element: T): Array<T>;

        in(element: T): boolean;
    }
}

// last element
Array.prototype.last = function () {
    return this[this.length - 1];
};

// remove element
Array.prototype.remove = function <T>(this: T[], element: T): T[] {
    return this.filter(e => e !== element);
}

// element in?
Array.prototype.in = function <T>(this: T[], element: T): boolean {
    return this.find(e => e === element) !== undefined;
}
