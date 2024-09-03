import React from "react";
import { MyPromise, getPromiseInstance } from "./PromiseLibrary";

MyPromise.any = function (promises) {
  let count = 0;
  let error = [];
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          count++;
          error[index] = err;
          if (count === promises.length) {
            reject(error);
          }
        });
    });
  });
};

function Form() {
  React.useEffect(() => {
    MyPromise.any([
      getPromiseInstance(3000, false),
      getPromiseInstance(1000, true),
    ]).then((res) => {
      console.log(res);
    });

    MyPromise.any([getPromiseInstance(3000), getPromiseInstance(1000)]).catch(
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <div>
      <h3>Promise.any</h3>
      <div>
        Whichever gets resolved first (otherwise reject with error array)
      </div>
    </div>
  );
}

export default Form;
