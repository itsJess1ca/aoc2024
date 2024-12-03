export function timeTaken(fn: Function) {
    const start = performance.now();
    fn();
    const after = performance.now()
    console.log(`Took ${(after - start).toFixed(2)}ms`);
}
