import React from "react";
import PromiseBasic from "./PromiseBasic";
import PromiseAll from "./PromiseAll";
import PromiseAny from "./PromiseAny";
import PromiseRace from "./PromiseRace";
import PromiseCancel from "./PromiseCancel";

function Form() {
  const [promiseType, setPromiseType] = React.useState();

  return (
    <div>
      <h2>Promises</h2>
      <br />
      <div>
        <label>
          Basic implementation
          <input
            type="radio"
            name="promiseType"
            checked={promiseType === "basic"}
            onChange={() => setPromiseType("basic")}
          />
        </label>
      </div>
      <div>
        <label>
          Promise.all
          <input
            type="radio"
            name="promiseType"
            checked={promiseType === "all"}
            onChange={() => setPromiseType("all")}
          />
        </label>
      </div>
      <div>
        <label>
          Promise.any
          <input
            type="radio"
            name="promiseType"
            checked={promiseType === "any"}
            onChange={() => setPromiseType("any")}
          />
        </label>
      </div>
      <div>
        <label>
          Promise.race
          <input
            type="radio"
            name="promiseType"
            checked={promiseType === "race"}
            onChange={() => setPromiseType("race")}
          />
        </label>
      </div>
      <div>
        <label>
          Promise.cancel
          <input
            type="radio"
            name="promiseType"
            checked={promiseType === "cancel"}
            onChange={() => setPromiseType("cancel")}
          />
        </label>
      </div>
      <br />
      <br />
      {promiseType === "basic" && <PromiseBasic />}
      {promiseType === "all" && <PromiseAll />}
      {promiseType === "any" && <PromiseAny />}
      {promiseType === "race" && <PromiseRace />}
      {promiseType === "cancel" && <PromiseCancel />}
    </div>
  );
}

export default Form;
