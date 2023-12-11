// ******************************************
// * TypeScript Overload
// ******************************************

// last element
Array.prototype.last = function () {
    return this[this.length - 1];
};

// remove element
Array.prototype.remove = function <T>(this: T[], element: T): T[] {
    return this.filter(e => e !== element);
}

// element in?
Array.prototype.in = function <T>(this: T[], element: T, field: string|undefined): boolean {
    if (field !== undefined) return this.find(e => (e as Record<any, any>)[field] === (element as Record<any, any>)[field]) !== undefined;
    else return this.find(e => e === element) !== undefined;
}
