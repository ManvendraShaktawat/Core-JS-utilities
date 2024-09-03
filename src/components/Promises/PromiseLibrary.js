export function MyPromise(callback) {
  this.state = "pending";
  this.value = null;
  this.thenCallbacks = [];
  this.catchCallback = null;

  this.then = function (thenCallback) {
    // Store the thenCallback to call later
    this.thenCallbacks.push(thenCallback);
    return this; // Allows chaining
  };

  this.catch = function (catchCallback) {
    this.catchCallback = catchCallback;
    return this; // Allows chaining
  };

  const resolve = (value) => {
    if (this.state !== "pending") return; // Only resolve once
    this.state = "fulfilled";
    this.value = value;

    // Execute all thenCallbacks in order, asynchronously
    setTimeout(() => {
      this.thenCallbacks.forEach((callback) => callback(this.value));
      this.thenCallbacks = [];
    });
  };

  const reject = (reason) => {
    if (this.state !== "pending") return; // Only reject once
    this.state = "rejected";
    this.value = reason;

    // Execute the catchCallback, if it exists, asynchronously
    setTimeout(() => {
      if (this.catchCallback) this.catchCallback(this.value);
    });
  };

  try {
    // no need to bind 'resolve' and 'reject', as they are arrow functions
    callback(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// Usage
export function getPromiseInstance(timeout, isResolve) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      isResolve
        ? resolve(`Promise (timeout=${timeout}) resolve`)
        : reject(`Promise (timeout=${timeout}) reject`);
    }, timeout);
  });
}
