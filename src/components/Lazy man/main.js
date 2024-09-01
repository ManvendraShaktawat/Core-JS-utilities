import React from "react";
import LazyMan from "./LazyMan";

function Lazy() {
  React.useEffect(() => {
    LazyMan("Jack", console.log).eat("banana").sleep(3).eat("apple").sleep(1);

    // LazyMan("Jack", console.log)
    //   .eat("banana")
    //   .eat("apple")
    //   .sleepFirst(2)
    //   .eat("egg")
    //   .sleepFirst(2);
  }, []);

  return (
    <div>
      <h2>Lazy man</h2>
      <div>(check console)</div>
    </div>
  );
}

export default Lazy;
