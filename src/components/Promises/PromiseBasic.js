import React from "react";

export function MyPromise(callback) {
  this.then = function (thenCallback) {
    this.thenCallback = thenCallback;
    return this;
  };
  this.catch = function (catchCallback) {
    this.catchCallback = catchCallback;
  };

  const resolve = function (...args) {
    if (this.thenCallback) {
      this.thenCallback(...args);
      this.thenCallback = null;
    }
  };
  const reject = function (...args) {
    if (this.catchCallback) {
      this.catchCallback(...args);
      this.catchCallback = null;
    }
  };
  callback(resolve.bind(this), reject.bind(this));
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

function PromiseBasic() {
  React.useEffect(() => {
    getPromiseInstance(3000).catch((err) => {
      console.error(err);
    });

    getPromiseInstance(1000, true).then((res) => {
      console.log(res);
    });
  }, []);
  return <h3>Basic implementation</h3>;
}

export default PromiseBasic;
