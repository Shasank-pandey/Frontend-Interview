
1.
function A() {
  this.value = 1;
  
  setTimeout(function() {
    this.value++;
    console.log(this.value); 
  }, 1000);

  setTimeout(() => {
    this.value++;
    console.log(this.value); 
  }, 2000);
}

var obj = new A();


2.
console.log('Start');

setTimeout(() => {
  console.log('Inside setTimeout 1');

  setTimeout(() => {
    console.log('Inside setTimeout 2');

    setTimeout(() => {
      console.log('Inside setTimeout 3');
    }, 0);
  }, 0);
}, 0);

setTimeout(() => {
  console.log('Inside setTimeout 4');
}, 0);

setInterval(() => {
  console.log('Inside setInterval');
}, 50);

console.log('End');


3.
console.log("Start");

setTimeout(function() {
  console.log("First Timeout");
}, 0);

Promise.resolve().then(function() {
  console.log("Promise 1");
}).then(function() {
  console.log("Promise 2");
});

setTimeout(function() {
  console.log("Second Timeout");
}, 0);

console.log("End");



4.
console.log("Start");

setTimeout(function() {
  console.log("Timeout 1");

  setTimeout(function() {
    console.log("Timeout 2");

    Promise.resolve().then(function() {
      console.log("Promise 1");
    });

    setTimeout(function() {
      console.log("Timeout 3");
    }, 0);

  }, 0);

}, 0);

Promise.resolve().then(function() {
  console.log("Promise 2");
}).then(function() {
  console.log("Promise 3");
});

console.log("End");


5.
console.log("Start");

async function async1() {
  console.log("Async 1 Start");
  await async2();
  console.log("Async 1 End");
}

async function async2() {
  console.log("Async 2 Start");
  await new Promise(resolve => {
    setTimeout(function() {
      console.log("Timeout in Async 2");
      resolve();
    }, 0);
  });
  console.log("Async 2 End");
}

async1();

new Promise(resolve => {
  console.log("Promise 1 Start");
  setTimeout(() => {
    console.log("Timeout in Promise 1");
    resolve();
  }, 0);
}).then(() => {
  console.log("Promise 1 End");
});

console.log("End");


6.

console.log("Start");

setTimeout(() => {
  console.log("Timeout");

  Promise.resolve().then(() => {
    console.log("Promise 1");
  });

  async function foo() {
    console.log("Async Start");
    await Promise.resolve().then(() => console.log("Promise in Async"));
    console.log("Async End");
  }

  foo();
}, 0);

Promise.resolve().then(() => console.log("Promise 2"));

console.log("End");


7.

console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");

  async function task() {
    console.log("Task Start");
    await new Promise(resolve => {
      setTimeout(() => {
        console.log("Promise in Task");
        resolve();
      }, 0);
    });
    console.log("Task End");
  }

  task();
}, 0);

new Promise(resolve => {
  console.log("Promise 2");
  resolve();
}).then(() => {
  console.log("Promise 3");
});

console.log("End");



8.
console.log("Start");

async function asyncFunc() {
  console.log("Async Start");

  await new Promise(resolve => {
    setTimeout(() => {
      console.log("Inside Promise");
      resolve();
    }, 0);
  });

  console.log("Async End");
}

asyncFunc();

console.log("End");


9.
console.log("Start");

async function asyncFunc() {
  console.log("Async Start");

  await new Promise(resolve => {
    setTimeout(() => {
      console.log("Inside Promise 1");
      resolve();
    }, 0);
  });

  await new Promise(resolve => {
    setTimeout(() => {
      console.log("Inside Promise 2");
      resolve();
    }, 0);
  });

  console.log("Async End");
}

asyncFunc();

console.log("End");


10.
console.log("Start");

async function asyncFunc() {
  console.log("Async Start");

  const result = await new Promise(resolve => {
    setTimeout(() => {
      console.log("Inside Promise");
      resolve("Resolved");
    }, 0);
  });

  console.log(result);
}

asyncFunc();

console.log("End");



11.
1. console.log(1);
setTimeout(() => {
  console.log(2);
}, 0);
Promise.resolve(3).then(res => {
    console.log(res);
    setTimeout(() => {
      console.log(7);
    }, 100);
 
    setTimeout(() => {
      console.log(8);
    }, 0);
});
setTimeout(() => {
  console.log(4);
}, 100);
setTimeout(() => {
  console.log(9);
}, 0);
 
setTimeout(() => {
  console.log(5);
}, -100);
 
console.log(6);





12. 
console.log(1);
setTimeout(() => {
  console.log(2);
}, 0); // Macro task

Promise.resolve(3).then(res => {
  console.log(res); // Microtask
  setTimeout(() => {
    console.log(7);
  }, 100); // Macro task
});

async function asyncFunction() {
  console.log(4); // Synchronous within async function
  const res = await Promise.resolve(5);
  console.log(res); // Microtask, after await
  setTimeout(() => {
    console.log(8);
  }, 0); // Macro task
}

asyncFunction();

setTimeout(() => {
  console.log(6);
}, 0); // Macro task

console.log(9);



13.
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

}

const member = new Person('Bruce', 'Wayne');

Person.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

console.log(member.getFullName()); // Output

const member2 = new Person('Arista', 'Network');
console.log(member2.getFullName());


14. 
console.log('start')
const timer1 = setTimeout(() => {
  console.log('t1');
}, 1000);
const promise1 = Promise.resolve().then(() => {
    console.log('p1')
    setTimeout(() => {
      console.log('t2');
    })
  });
const timer2 = setTimeout(() => {
  console.log('t3')
}, 0)
console.log('end')
