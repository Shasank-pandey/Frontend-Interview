# Advanced JavaScript Coding Problems

---

### 1. Promise Batch Execution  
Write a function that takes an array of promise-returning functions and a batch size `n`, and executes `n` promises at a time. Once the current batch completes, the next batch should begin.

---

### 2. Promise Pool (Concurrency Control)  
Create a function that accepts an array of promise-returning functions and a pool size `k`. At most `k` promises should run concurrently. As soon as any promise resolves, the next one should start, maintaining the pool size.

---

### 3. Promise with Retry and Delay  
Write a utility function that retries a failed promise-based function `n` times with a configurable delay between each retry.

---

### 4. Polyfill for Promise Methods  
Implement the following polyfills for native JavaScript Promise methods:
- `Promise.all`
- `Promise.race`
- `Promise.any`
- `Promise.allSettled`

---

### 5. Polyfill for the `new` Keyword  
Write a function that replicates the behavior of the JavaScript `new` keyword.  
Example:
```js
function MyNew(ConstructorFn, ...args) {
  // implement custom 'new'
}
```

---

### 6. Promise Result Caching
Write a function that wraps a promise-returning API call and caches its result for a specified duration. During this time, any call to the function should return the cached result without calling the API again.


---

### 7. Custom setInterval Implementation
Recreate your own version of setInterval using setTimeout, ensuring the behavior mimics native setInterval.

---

### 8. Implement Redux from Scratch
Create a simplified version of Redux that includes:

-createStore
-dispatch
-getState
-subscribe

---

### 9. Event Bus (Pub-Sub System)
Design and implement an event bus system that allows:

-Subscribing to events with callback handlers
-Publishing events to notify subscribers
-Unsubscribing from events
