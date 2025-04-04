# Advanced JavaScript Coding Problems

---

### 1. Promise Batch Execution  
Execute an array of promise-returning functions in fixed-size batches. Wait for each batch to finish before starting the next.

---

### 2. Promise Pool (Max Concurrent Promises)  
Run only `n` promises at a time from an array of promise-returning functions. As soon as one finishes, start the next—ensuring concurrency limit is maintained.

---

### 3. Promise with Retry and Delay  
Implement a retry mechanism for a promise-returning function with configurable retries and delay between each retry attempt.

---

### 4. Polyfills for Promise Methods  
Write polyfills for native JavaScript Promise methods:  
- `Promise.all`  
- `Promise.race`  
- `Promise.any`  
- `Promise.allSettled`

---

### 5. Polyfill for the `new` Keyword  
Replicate the behavior of JavaScript’s `new` keyword with a custom function.

---

### 6. Promise Result Caching with Expiry  
Wrap an API function so its result is cached and reused for a certain period. Within that time, repeated calls return cached data.

---

### 7. Custom `setInterval` Implementation  
Recreate the functionality of `setInterval` using `setTimeout`.

---

### 8. Build Your Own Redux  
Implement a simplified version of Redux including:  
- `createStore`  
- `dispatch`  
- `getState`  
- `subscribe`

---

### 9. Event Bus (Publisher-Subscriber Pattern)  
Create an event bus system supporting:  
- Event subscription  
- Event emission (publish)  
- Event unsubscription

---
