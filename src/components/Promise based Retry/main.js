import React from "react";
import retry from "./retry";

const simulateFailure = () => {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.7) {
      resolve("Success");
    } else {
      reject("Failure");
    }
  });
};

function PromiseBasedRetry() {
  React.useEffect(() => {
    retry(simulateFailure, 3, 1000)
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Promise based Retry</h2>
      <div>(check console)</div>
    </div>
  );
}

export default PromiseBasedRetry;
