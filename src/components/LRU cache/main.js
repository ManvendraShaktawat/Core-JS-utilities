import React from "react";
import LRUCache from "./LRU";

function Form() {
  React.useEffect(() => {
    const lru = new LRUCache(2);
    lru.set("a", 1);
    lru.set("b", 2);
    console.log("a =", lru.get("a"));
    lru.set("c", 3);
    console.log("b =", lru.get("b"));
    lru.set("b", 2);
    console.log("b =", lru.get("b"));
    console.log("c =", lru.get("c"));
    console.log("a =", lru.get("a"));
  }, []);

  return (
    <div>
      <h2>LRU Cache</h2>
      <div>(check console)</div>
    </div>
  );
}

export default Form;
