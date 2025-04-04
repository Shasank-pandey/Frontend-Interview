```js

// Question 1
console.log(a);
var a = 1;

setTimeout(function() {
  console.log(a);
  var a = 2;
}, 0);

setTimeout(function() {
  console.log(a);
}, 0);

var a = 3;

// Question 2
function createCounters() {
  var counters = [];
  
  for (var i = 0; i < 3; i++) {
    counters[i] = function() {
      console.log(i);  // ?
    };
  }
  
  return counters;
}

var counters = createCounters();
counters[0]();  // ?
counters[1]();  // ?
counters[2]();  // ?

// Question 3
function outer() {
  var count = 0;
  
  return function inner() {
    count++;
    console.log(count);  // ?
  };
}

var counter1 = outer();
counter1();  // ?
counter1();  // ?

var counter2 = outer();
counter2();  // ?
counter1();  // ?
counter2();  // ?

// Question 4
console.log(x);

var x = 5;

function test() {
  console.log(y);
  var y = 10;
}

test();

console.log(z);
let z = 15;

// Question 5
var x = 10;
console.log(x);

if (true) {
  var x = 20;
  console.log(x);
}

function test() {
  var x = 30;
  console.log(x);

  if (true) {
    var x = 40;
    console.log(x);
  }
}

test();

console.log(x);

// Question 6
var x = 10;
console.log(x);

function outer() {
  var x = 20;
  console.log(x);

  function inner() {
    var x = 30;
    console.log(x);

    if (true) {
      var x = 40;
      console.log(x);
    }
  }

  inner();
}

outer();

console.log(x);

// Question 7
var x = 1;

function test() {
  console.log(x);  // What will this log?

  if (false) {
    var x = 2;
    console.log(x);  // What will this log?
  }

  console.log(x);  // What will this log?
}

test();

console.log(x);  // What will this log?

// Question 8
function outer() {
  var x = 10;

  return function inner() {
    var y = 20;

    return function innermost() {
      var z = 30;
      console.log(x + y + z);
    };
  };
}

var closure1 = outer(); 
var closure2 = closure1(); 
closure2();  // What will this log?

// Question 9
function counter() {
  var count = 0;

  return function increment() {
    count++;
    console.log(count);
    return function decrement() {
      count--;
      console.log(count);
    };
  };
}

var incrementer = counter();  // First call to counter
var decrementer = incrementer();  // First call to increment
decrementer();  // Call to decrement
incrementer();  // Call to increment again

// Question 10
function outer() {
  var x = 10;
  
  return function inner() {
    var y = 20;
    
    return function innermost() {
      var z = 30;
      
      setTimeout(function() {
        console.log(x + y + z);
      }, 1000);
    };
  };
}

var closure1 = outer();
var closure2 = closure1();
var closure3 = closure2();
closure3();  // What will this log after 1 second?

