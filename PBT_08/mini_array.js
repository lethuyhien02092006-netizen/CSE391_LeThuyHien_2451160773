const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) result.push(arr[i]);
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let acc = initialValue;
        let start = 0;
        if (initialValue === undefined) {
            if (arr.length === 0) {
                throw new TypeError("Reduce of empty array with no initial value");
            }
            acc = arr[0];
            start = 1;
        }
        for (let i = start; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    },
};

console.log(miniArray.map([1, 2, 3], (x) => x * 2));
console.log(miniArray.filter([1, 2, 3, 4], (x) => x > 2));
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));

module.exports = miniArray;
