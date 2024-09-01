function createStore(initialState, reducer) {
  let state = initialState;
  let listeners = [];

  return {
    getState: () => {
      return state;
    },
    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return {
        unsubscribe: () => {
          listeners = listeners.filter((l) => l !== listener);
        },
      };
    },
  };
}

export default createStore;
