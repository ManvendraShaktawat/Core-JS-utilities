/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  let queue = [];

  queue.push({ type: "start", fn: () => logFn(`Hi, I'm ${name}.`) });

  function eat(food) {
    queue.push({ type: "eat", fn: () => logFn(`Eat ${food}.`) });
    return returnObj;
  }

  function executeQueue() {
    const item = queue.shift();
    if (item) {
      item.fn();
      if (item.type !== "sleep") {
        executeQueue();
      }
    }
  }

  function sleep(time, isSleepFirst) {
    const queueObj = {
      type: "sleep",
      fn: () => {
        setTimeout(() => {
          logFn(`Wake up after ${time} second${time > 1 ? "s" : ""}.`);
          executeQueue();
        }, time * 1000);
      },
    };
    if (isSleepFirst) {
      queue.unshift(queueObj);
    } else {
      queue.push(queueObj);
    }
    return returnObj;
  }

  const returnObj = {
    eat,
    sleep,
    sleepFirst: (time) => sleep(time, true),
  };

  setTimeout(executeQueue);

  return returnObj;
}

export default LazyMan;
