# JavaScript Coding Questions

---

### 1. Currying – Write a function to find sum  
Example: `Sum(1,2,3)(1,2)(3)` – When there is a blank param, return the result.

---

### 2. Given a HTML string, find the innerText of a `div` by its ID.

---

### 3. Write a function `deepCopy` to clone nested arrays/objects and return a new array/object.

---

### 4. Given an array of asynchronous functions (each returning a Promise), write code to execute all the functions serially.

---

### 5. Execute all functions in an array serially: `f2` runs after `f1`, `f3` after `f2`, and so on.

---

### 6. You have a sub-rotated sorted array. Write your own binary search logic.

---

### 7. Implement a method to print numbers from 1 to 10 with a 1-second interval between each.

---

### 8. Write a currying function that takes `n` arguments and alternates between ADD and MINUS operations.  
Example:  
- `plusMinus() // return 0`  
- `plusMinus(2)(3)(4)() // return 2 + 3 - 4 = 1`  
- `plusMinus(2)(3)(4)(5)(6)() // return 2 + 3 - 4 + 5 - 6 = 0`

---

### 9. Write a recursive function to flatten a nested array  
Example:  
`[1,2,[3],[[4]],[5,6]] → [1,2,3,4,5,6]`

---

### 10. Write a function that takes two strings `ransomNote` and `magazine`, and returns true if `ransomNote` can be constructed from `magazine`.  
**Note**: Each letter in `magazine` can only be used once.

---

### 11. Given a DOM structure, calculate and print the count of all DOM nodes.

---

### 12. Find relevant words in a sentence and remove all extra characters (`?`, `.`, `!`, `[ ]`).

---

### 13. Write a function to sum all elements in an array using recursion (no `reduce`, `map`, or loops).

---

### 14. Write a function that takes an object and returns a deep-cloned object with a different reference.

---

### 15. Add a prototype method `.even()` to arrays that returns all even elements.

---

### 16. Write polyfills for:
- `Promise`
- `call`
- `apply`
- `bind`
- `map`
- `filter`
- `reduce`
- `Map()`

---

### 17. Implement **throttling** and **debouncing** in JavaScript.

---

### 18. From an array of objects, filter objects where `age > 24` and `age < 30`, and remove duplicates.

---

### 19. From an array of objects, create a `Map` that accumulates all common values.

---

### 20. Write a currying function `sum`  
Example: `sum(2)(3)(5)`

---

### 21. Write a function to memoize arguments and decide whether to execute the function or return the cached result.  
Example:
```js
const sum = (a, b, c) => a + b + c;

const memoizeOne = (cb) => {
  // implement your code
};

const memoizedSum = memoizeOne(sum);
memoizedSum(1,2,3); // Executed
memoizedSum(1,2,3); // Cached
memoizedSum(1,2,'3'); // Executed
memoizedSum(1,2,'3'); // Cached

const obj1 = { a: 123 };
memoizedSum(obj1, 2, 3); // Executed
memoizedSum(obj1, 2, 3); // Cached
memoizedSum({ a: 123 }, 2, 3); // Executed (new reference)

---

### 23. Transform (flatten) an object into a single-level object with keys using underscores.
Input:
const objInput = {
  name: {
    inner1: "shasank",
    inner2: {
      test: 34
    }
  },
  child: {
    city: "bangalore"
  },
  age: 24
}
Output:
{
  name_inner1: "shasank",
  name_inner2_test: 34,
  child_city: "bangalore",
  age: 24
}
