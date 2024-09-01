import React from "react";
import createStore from "./redux";

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

const store = createStore(initialState, reducer);

function ReactRedux() {
  const subscribeRef = React.useRef(null);

  React.useEffect(() => {
    console.log(`Initial state: ${store.getState().counter}`);
    subscribeRef.current = store.subscribe((state) => {
      console.log(`State changed: ${state.counter}`);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Redux</h2>
      <div>
        <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
          Increment
        </button>
        <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
          Decrement
        </button>
        <br />
        <br />
        <div>
          <button onClick={() => subscribeRef.current.unsubscribe()}>
            Unsubscribe
          </button>
        </div>
      </div>
      <br />
      <div>(check console)</div>
    </div>
  );
}

export default ReactRedux;
