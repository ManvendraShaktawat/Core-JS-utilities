function LRUCache(size) {
  const cacheMap = {};
  const LRUQueue = Array(size);

  return {
    set: function (key, val) {
      console.log(`Set ${key} to ${val}`);
      if (!cacheMap[key]) {
        cacheMap[key] = val;
        if (LRUQueue[size - 1]) {
          delete cacheMap[LRUQueue[size - 1]];
        }
        console.log(LRUQueue);
        LRUQueue.pop();
        LRUQueue.unshift(key);
      }
    },
    get: function (key) {
      if (cacheMap[key]) {
        LRUQueue.splice(LRUQueue.indexOf(key), 1);
        LRUQueue.unshift(key);
        return cacheMap[key];
      }
      return -1;
    },
  };
}

export default LRUCache;
