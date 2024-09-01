import React from "react";
import deepClone from "./deepClone";

function DeepClone() {
  React.useEffect(() => {
    const original = { a: 1, b: { c: 2, d: 3 }, e: [4, 5, { f: 6 }] };
    const copy = deepClone(original);
    console.log("original", original);
    console.log("copy", copy);
  }, []);

  return (
    <div>
      <h2>Deep clone</h2>
      <div>(check console)</div>
    </div>
  );
}

export default DeepClone;
