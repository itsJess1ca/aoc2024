export function timeTaken(label: string, fn: Function, ...args: unknown[]) {
    const start = performance.now();
    const response = fn(...args);
    const after = performance.now()
    console.log(`[${label}] Took ${(after - start).toFixed(2)}ms`);
    return response;
}
