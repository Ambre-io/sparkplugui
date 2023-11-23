
export const utils: any = {
    // This should be array.includes('value') but it's to early to use (ES7)
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    includes: (value: any, array: Array<any>) => array.indexOf(value) !== -1,
    dateFrom: (timestamp: number): string => new Date(timestamp).toISOString()
}
