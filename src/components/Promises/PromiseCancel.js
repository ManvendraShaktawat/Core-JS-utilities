import React from "react";
import { MyPromise, getPromiseInstance } from "./PromiseLibrary";

MyPromise.allWithCancel = function () {
  let count = 0;
  let total;
  let result = [];
  let isCancelled = [];

  function updateCount(resolve) {
    count++;
    if (count === total) {
      resolve(result);
    }
  }

  return {
    execute: (promises) =>
      new MyPromise((resolve, reject) => {
        total = promises.length;
        isCancelled = new Array(total).fill(false); // Track cancellations

        promises.forEach((promise, index) => {
          promise
            .then((res) => {
              if (!isCancelled[index]) {
                // Check if not cancelled
                result[index] = res;
                updateCount(resolve); // Update count using closure-scoped resolve
              }
            })
            .catch((err) => {
              reject(err); // Reject immediately if any promise fails
            });
        });
      }),
    cancel: (cancelIndexes) => {
      cancelIndexes.forEach((idx) => {
        if (!result[idx] && !isCancelled[idx]) {
          // Only cancel if not already resolved or cancelled
          isCancelled[idx] = true;
          updateCount(() => {}); // Call updateCount with an empty function for cancellation
          result[idx] = "cancelled";
        }
      });
    },
  };
};

function Form() {
  React.useEffect(() => {
    const { execute, cancel } = MyPromise.allWithCancel();

    execute([
      getPromiseInstance(3000, true),
      getPromiseInstance(1000, true),
      getPromiseInstance(2000, true),
    ]).then((res) => {
      console.log(res);
    });

    cancel([0]);
  }, []);
  return (
    <div>
      <h3>Promise.cancel</h3>
      <div>Cancel an ongoing promise</div>
    </div>
  );
}

export default Form;
