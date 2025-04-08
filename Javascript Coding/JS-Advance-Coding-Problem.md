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

```js
function CachedApi(apicall,ttl){
    let cached = {}
    return function(...args){
        const now = Date.now()
        const key = JSON.stringify(args);
        if(cached[key]){
             const { time, promise, value } = cached[key];
             console.log("from cache")
            if(promise){
                return promise
            }
            if(now - time <= ttl*1000){
                return Promise.resolve(value)
            }
        }
           console.log("from api")
           const prom = apicall().then(response=>{
                cached[key] = {
                    promise: null,
                    time : Date.now() ,
                    value : response
                 }
                return response
            })
            cached[key] = {
                promise: prom,
                time : Date.now() ,
                value : null
            }
            return prom
        }
}

function apicall(){
    return new Promise(res=>{
        setTimeout(res("hey bro"),3000)
    })
}

const CachedApiInstance = CachedApi(apicall,3)

// 🔁 These three are called at (almost) the same time, only one API should trigger
CachedApiInstance(1, 2).then((res) => console.log("1️⃣", res));
CachedApiInstance(1, 2).then((res) => console.log("2️⃣", res));
CachedApiInstance(1, 2).then((res) => console.log("3️⃣", res));

// ⏱️ Later call with same args after 4 seconds (within TTL)
setTimeout(() => {
  CachedApiInstance(1, 2).then((res) => console.log("4️⃣ from cached (within TTL)", res));
}, 4000);
```

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
