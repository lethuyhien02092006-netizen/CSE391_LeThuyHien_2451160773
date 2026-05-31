function pipe(...fns) {
    return (value) => fns.reduce((acc, fn) => fn(acc), value);
}
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}
function debounce(fn, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}
async function retry(fn, maxAttempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt === maxAttempts) throw lastError;
        }
    }
}

const process = pipe(
    (x) => x * 2,
    (x) => x + 10,
    (x) => x.toString(),
    (x) => "Kết quả: " + x
);
console.log(process(5));

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

module.exports = { pipe, memoize, debounce, retry };
