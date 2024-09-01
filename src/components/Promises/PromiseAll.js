import React from "react";
import { MyPromise, getPromiseInstance } from "./PromiseBasic";

MyPromise.all = function (promises) {
  let count = 0;
  let result = Array(promises.length);
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          count++;
          result[index] = res;
          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

function Form() {
  React.useEffect(() => {
    MyPromise.all([
      getPromiseInstance(3000, true),
      getPromiseInstance(1000, true),
    ]).then((res) => {
      console.log(res);
    });

    // MyPromise.all([
    //   getPromiseInstance(3000, true),
    //   getPromiseInstance(1000),
    // ]).catch((err) => {
    //   console.error(err);
    // });
  }, []);
  return (
    <div>
      <h3>Promise.all</h3>
      <div>
        Whichever gets rejected first (otherwise resolve with result array)
      </div>
    </div>
  );
}

export default Form;
