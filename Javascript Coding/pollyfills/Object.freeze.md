```js
function seal(obj) {
  Object.getOwnPropertyNames(obj).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor.configurable) {
      Object.defineProperty(obj, key, {
        configurable: false
        // writable is not touched
      });
    }
  });

  Object.preventExtensions(obj);
  return obj;
}
