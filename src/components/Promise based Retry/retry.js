function retry(fn, retries, delay) {
  let count = 0;

  return new Promise((resolve, reject) => {
    const attempt = async () => {
      count++;
      try {
        const result = await fn();
        resolve(`${result} (attempts - ${count})`);
      } catch (error) {
        if (count === retries) {
          reject(`${error} (after ${retries} failed attempts)`);
        } else {
          setTimeout(() => {
            attempt();
          }, delay);
        }
      }
    };
    attempt();
  });
}

export default retry;
