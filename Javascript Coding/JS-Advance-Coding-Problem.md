# Advanced JavaScript Coding Problems

---

### 0.1 Promise All in one (max concurrency, retry, multiple priority Queue)
Promise - Multiple Task runner on priority, retry mechanism and max concurrency

```js

function randomFailTask(name) {
    return () =>
        new Promise((resolve, reject) => {
            const fail = Math.random() < 0.3;
            setTimeout(() => {
                if (fail) reject(`${name} failed`);
                else resolve(`${name} done`);
            }, Math.random() * 1000);
        });
}

function retryWrapper(prom, retries) {
    return new Promise((resolve, reject) => {
        function retry(attempt) {
            prom()
                .then(resolve)
                .catch(() => {
                    if (attempt >= retries) {
                        reject(`Failed after ${retries} retries`);
                    } else {
                        setTimeout(() => retry(attempt + 1), 2000);
                    }
                });
        }
        retry(0);
    });
}

function runPriorityTasks(queues, limit, retries) {
    let onGoing = 0;
    let result = [];
    let idx = 0;
    const priorityEnum = ['high', 'medium', 'low'];

    function getNextTask() {
        for (let prio of priorityEnum) {
            if (queues[prio].length > 0) {
                const task = queues[prio].shift();
                return { id: idx++, task, priority: prio };
            }
        }
        return null;
    }

    return new Promise((res) => {
        function execute() {
            if (onGoing === 0 && priorityEnum.every(item => queues[item].length === 0)) {
                res(result);
                return;
            }

            while (onGoing < limit) {
                const taskData = getNextTask();
                if (!taskData) break;

                const { id, task, priority } = taskData;
                onGoing++;

                retryWrapper(task, retries).then(msg => {
                    result[id] = `[${priority.toUpperCase()}] ${msg}`;
                    onGoing--;
                    execute();
                }).catch(err => {
                    result[id] = `[${priority.toUpperCase()}] ${err}`;
                    onGoing--;
                    execute();
                });
            }
        }

        execute();
    });
}

// Test:
const queues = {
    high: [randomFailTask('H1'), randomFailTask('H2')],
    medium: [randomFailTask('M1'), randomFailTask('M2')],
    low: [randomFailTask('L1'), randomFailTask('L2'), randomFailTask('L3')],
};

runPriorityTasks(queues, 3, 2).then(res => {
    console.log('All done:\n', res);
});


```

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

  ```js
  import React, { useState, useEffect } from 'react';

const reducer=(state,action)=>{
  switch(action.type){
    case "INC":
      return {...state,counter:state.counter+1}
    case "DEC":
      return {...state,counter: state.counter-1}
    default : 
      return {...state}
  }
}

function createStore(reducer){
  let state = {
    counter:0
  }

  let listeners = []

  function dispatch(action){
    state  = reducer(state,action)
    listeners.forEach(cb=> cb())
  }

  function subscribe(cb){
    listeners.push(cb)
  }

  function getState(){
    return state
  }

  return {dispatch,subscribe,getState}
}


const {dispatch,subscribe,getState} = createStore(reducer)


function MyComponent() {
  const [state, setState] = useState(0);


  useEffect(()=>{
   subscribe(()=>{
    setState(getState().counter)
  })
  },[])

  return (
    <div>
       <p>state: {state}</p>
      <button onClick={()=>dispatch({type:"INC"})}>Increment</button>
      <button onClick={()=>dispatch({type:"DEC"})}>Decrement</button>
    </div>
  );
}

export default MyComponent;

  ```

---

### 9. Event Bus (Publisher-Subscriber Pattern)  
Create an event bus system supporting:  
- Event subscription  
- Event emission (publish)  
- Event unsubscription

---
