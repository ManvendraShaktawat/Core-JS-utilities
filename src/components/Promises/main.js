import React from "react";
import PromiseBasic from "./PromiseBasic";
import PromiseAll from "./PromiseAll";
import PromiseAny from "./PromiseAny";
import PromiseRace from "./PromiseRace";

function Form() {
  const [promiseType, setPromiseType] = React.useState();

  return (
    <div>
      <h2>Promises</h2>
      <br />
      <label>
        Basic implementation
        <input
          type="radio"
          name="promiseType"
          checked={promiseType === "basic"}
          onChange={() => setPromiseType("basic")}
        />
      </label>
      <label>
        Promise.all
        <input
          type="radio"
          name="promiseType"
          checked={promiseType === "all"}
          onChange={() => setPromiseType("all")}
        />
      </label>
      <label>
        Promise.any
        <input
          type="radio"
          name="promiseType"
          checked={promiseType === "any"}
          onChange={() => setPromiseType("any")}
        />
      </label>
      <label>
        Promise.race
        <input
          type="radio"
          name="promiseType"
          checked={promiseType === "race"}
          onChange={() => setPromiseType("race")}
        />
      </label>
      <br />
      <br />
      {promiseType === "basic" && <PromiseBasic />}
      {promiseType === "all" && <PromiseAll />}
      {promiseType === "any" && <PromiseAny />}
      {promiseType === "race" && <PromiseRace />}
    </div>
  );
}

export default Form;
