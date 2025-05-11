# Advanced JavaScript Coding Problems

---

### 0.1 Implement an engine that process async callbacks using javascript. 
You should provide the implementation of the constructor and process methods, Do not change the names of these methods or the number of arguments they receive.

The constructor method should recieve an optional string., The value of the string will be responsible for the order in which callbacks stored in the queue are processes.
The only non-empty value it can recieve in the string LIFO(Last in first out). the default order of proecessing callbacks in the queue will be FIFO (First in first out)

The process method recieve a singhe async function that should be executes by following the algorithim described below: 


* If there is currently no async funcitn being executed by the class, the received callback method should be executed immediately.
* If there is currently onl one async function currently being executed the callback method shoudl be executed immediatley as well.
* If there are two async function currently being executed the callback method should be put int the queue.
* After on of the currently executed async function is finished
* When there were no argument passed to the contructor the first callback method that was pusehd into the queue should be executed (First in first out).
* When the argument passed to the contructor was LIFO, the last callback in the queu should be executed.
* If there are more than 6 callbacks in the queue discard any extra callbacks
* If there are more than 3 callbacks in the queue, follow FIFO if no argument is passed to constructor

```js
class QueueCallbacks {
  constructor(mode) {
    this.onGoing = 0; // Track number of currently running async functions
    this.Q = []; // Queue to store pending callbacks
    this.mode = mode === 'LIFO' ? 'LIFO' : 'FIFO'; // Mode can be 'LIFO' or 'FIFO'
  }

  // Main method to process the callback
  async process(cb) {
    // If there are less than 2 async functions currently running, execute the callback
    if (this.onGoing < 2) {
      this.onGoing++; // Increment ongoing count
      try {
        await cb(); // Execute the async callback
      } finally {
        this.onGoing--; // Decrement ongoing count after completion
        this._next(); // Process the next callback in the queue
      }
    } else {
      // If the ongoing count is >= 2, queue the callback
      if (this.Q.length >= 6) {
        return; // If the queue already has 6 callbacks, discard any additional callbacks
      }

      // If there are more than 3 callbacks in the queue, enforce FIFO regardless of mode
      if (this.Q.length > 3) {
        this.Q.push(cb); // Enforce FIFO (push to end of the queue)
      } else {
        // Otherwise, follow the given mode (LIFO or FIFO)
        if (this.mode === 'LIFO') {
          this.Q.push(cb); // LIFO mode: add to the end of the queue
        } else {
          this.Q.unshift(cb); // FIFO mode: add to the front of the queue
        }
      }
    }
  }

  // Helper method to process the next callback in the queue
  async _next() {
    if (this.Q.length === 0 || this.onGoing >= 2) return; // No pending callbacks or max limit reached

    let cb;
    
    // If the queue has more than 3 items, enforce FIFO
    if (this.Q.length > 3) {
      cb = this.Q.shift(); // Enforce FIFO (pop from front)
    } else {
      // Follow the mode (LIFO or FIFO)
      if (this.mode === 'FIFO') {
        cb = this.Q.shift(); // FIFO: pop from front
      } else {
        cb = this.Q.pop(); // LIFO: pop from end
      }
    }

    if (cb) {
      this.onGoing++; // Increment ongoing count
      try {
        await cb(); // Execute the callback
      } finally {
        this.onGoing--; // Decrement ongoing count after completion
        this._next(); // Recursively process next callback in the queue
      }
    }
  }
}

// Test Example

// Create a QueueCallbacks instance with FIFO mode (default)
const queue = new QueueCallbacks('FIFO');

// Simulate async tasks with delays
const simulateAsyncTask = (id, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${id} completed after ${delay}ms`);
      resolve();
    }, delay);
  });
};

// Add tasks to the queue
queue.process(() => simulateAsyncTask(1, 1000));
queue.process(() => simulateAsyncTask(2, 500));
queue.process(() => simulateAsyncTask(3, 1500));
queue.process(() => simulateAsyncTask(4, 200));
queue.process(() => simulateAsyncTask(5, 800));
queue.process(() => simulateAsyncTask(6, 300));
queue.process(() => simulateAsyncTask(7, 600)); 
```

---

### 0.1 Implement an engine that process async callbacks using javascript.
Execute an array of promise-returning functions in fixed-size batches. Wait for each batch to finish before starting the next.

---
### 0.2 Design and Implement Circuite Breaker  
Design and Implement Circuite Breaker in JS/node js to offload server if it fails continously

```js
class CircuitBreaker {
  constructor(action, options = {}) {
    this.action = action;
    this.threshold = options.threshold || 5;
    this.successThreshold = options.successThreshold || 2;
    this.timeout = options.timeout || 10000;

    this.failureCount = 0;
    this.successCount = 0;
    this.state = 'CLOSED';
    this.nextAttempt = Date.now();
  }

  async call(...args) {
    // If circuit is OPEN, check if we can move to HALF_OPEN
    if (this.state === 'OPEN') {
      if (Date.now() >= this.nextAttempt) {
        this.state = 'HALF_OPEN';
        console.log('Transitioning to HALF_OPEN');
      } else {
        console.log('CIRCUIT OPEN: blocking request');
        throw new Error('Circuit is OPEN. Please try later.');
      }
    }

    try {
      const result = await this.action(...args);
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFail();
      throw err;
    }
  }

  onSuccess() {
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= this.successThreshold) {
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.successCount = 0;
        console.log('Circuit CLOSED after successful half-open attempts');
      }
    } else {
      this.failureCount = 0;
    }
  }

  onFail() {
    this.failureCount++;
    if (this.state === 'HALF_OPEN' || this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
      this.successCount = 0;
      console.log('Circuit OPENED due to failures');
    }
  }
}

// Example function that randomly fails
async function randomPromise() {
  const val = Math.random() * 10;
  if (val > 5) {
    throw new Error('Random failure');
  }
  return '✅ Success!';
}

// Set up Circuit Breaker
const options = {
  threshold: 3,
  successThreshold: 2,
  timeout: 5000, // 5 seconds
};

const breaker = new CircuitBreaker(randomPromise, options);

// Call every second
setInterval(async () => {
  try {
    const res = await breaker.call();
    console.log(`[${breaker.state}]`, res);
  } catch (e) {
    console.log(`[${breaker.state}]`, e.message);
  }
}, 1000);


```

---

### 0.3 Promise all-in-one (max concurrency, retry, multiple priority Queue)
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

```js
class PubSub {
    constructor(){
        this.subscribers = {}
    }
    
      subscribe(event, cb) {
      if (!this.subscribers[event]) {
        this.subscribers[event] = [];
      }
      this.subscribers[event].push(cb);  // push regardless
      }
    
    publish(event,data){
        if(!this.subscribers[event]){
           throw "Invalid Publish"
        }
        else {
            this.subscribers[event].forEach(cb=>cb(data))
        }
    }
    
    unsubscribe(event,cb){
        if(this.subscribers[event]){
            this.subscribers[event] = this.subscribers[event].filter(fn=> fn !== cb)
        }
    }
}

const pub = new PubSub()

pub.subscribe('fetch',(data)=>{console.log("data in subs",data)})
pub.publish('fetch',{name:"shasank"})

```

---
