```js
// Question 1
const obj = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};

const getValue = obj.getValue();
console.log(getValue); // corrected to getValue



// Question 2
const obj2 = {
  name: "Alice",
  greet: function() {
    console.log(this.name);
    
    setTimeout(function() {
      console.log(this.name);
    }, 1000);
  }
};

obj2.greet();



// Question 3
const obj3 = {
  name: "Alice",
  greet() {
    console.log(this.name);
    
    const innerObj = {
      name: "Inner",
      getName: () => {
        console.log(this.name);
      }
    };
    
    innerObj.getName();
  }
};

obj3.greet();



// Question 4
var name = "Global";

const obj4_1 = {
  name: "Alice",
  greet: function() {
    console.log(this.name);
  }
};

const obj4_2 = {
  name: "Bob",
};

obj4_2.greet = obj4_1.greet;
obj4_2.greet();



// Question 5
const obj5_1 = {
  name: "Alice",
  greet: function () {
    return `Hello, ${this.name}`;
  },
};

const obj5_2 = { name: "Bob" };

// Using call
const callResult = obj5_1.greet.call(obj5_2);
console.log(callResult);

// Using apply
const applyResult = obj5_1.greet.apply(obj5_2);
console.log(applyResult);

// Using bind
const boundGreet = obj5_1.greet.bind(obj5_2);
const bindResult = boundGreet();
console.log(bindResult);



// Question 6
const outerObj = {
  outerName: "Outer",
  innerObj: {
    innerName: "Inner",
    getInnerName: function () {
      console.log(this.innerName);
      return () => {
        console.log(this.outerName); // undefined
        return this.innerName;       // returns "Inner"
      };
    },
  },
};

// Executing the code
const getNameFn = outerObj.innerObj.getInnerName();
const result = getNameFn();
console.log(result);

