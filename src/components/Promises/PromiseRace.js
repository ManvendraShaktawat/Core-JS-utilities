import React from "react";
import { MyPromise, getPromiseInstance } from "./PromiseLibrary";

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

function Form() {
  React.useEffect(() => {
    MyPromise.race([
      getPromiseInstance(3000, true),
      getPromiseInstance(1000, false),
    ]).catch((err) => {
      console.error(err);
    });

    MyPromise.race([
      getPromiseInstance(3000, false),
      getPromiseInstance(1000, true),
    ]).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <h3>Promise.race</h3>
      <div>Whichever finishes first (resolve or reject)</div>
    </div>
  );
}

export default Form;
