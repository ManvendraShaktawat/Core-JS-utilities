/*
    1. Handles arrays, objects, primitive and null
    2. Handles circular object reference ('seen')
    3. Handles not cloning inherited properties ('ownKeys')
*/

function deepCopy(obj, seen = new Map()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (seen.has(obj)) {
    return seen.get(obj);
  }
  if (Array.isArray(obj)) {
    const arrCopy = [];
    seen.set(obj, arrCopy);
    obj.forEach((item, index) => {
      arrCopy[index] = deepCopy(item, seen);
    });
    return arrCopy;
  }
  const result = {};
  seen.set(obj, result);
  Reflect.ownKeys(obj).forEach((key) => {
    result[key] = deepCopy(obj[key], seen);
  });
  return result;
}
