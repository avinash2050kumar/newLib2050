export const objectOmit = (obj: any, ...props: any) => {
  const result = { ...obj };
  props.forEach(function (prop: any) {
    delete result[prop];
  });
  return result;
};

export const objectPick = (obj: any, ...props: any) => {
  return props.reduce(function (result: any, prop: any) {
    result[prop] = obj[prop];
    return result;
  }, {});
};

export const objectMissingValue = (oldData: any, newData: any) => {
  const keys = Object.keys(oldData);
  keys.forEach((key) => {
    if (newData[key] === undefined) {
      newData[key] = oldData[key];
    }
  });
  return newData;
};

export const objectRemoveEmpty = (obj: any, keys: string[]) => {
  keys.forEach((key) => {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
};

export const objectRemoveEmptyDeeply = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object")
      objectRemoveEmptyDeeply(obj[key]);
    else if (obj[key] === "" || obj[key] === null || obj[key] === undefined)
      delete obj[key];
  });
  return obj;
};

export const objectUpdateDeeply = (obj: any, key: string, value: any) => {
  const newObj = { ...obj };
  const keys = key.split(".");
  const lastKey = keys.pop();
  let currentObj = newObj;
  keys.forEach((key) => {
    currentObj[key] = { ...currentObj[key] };
    currentObj = currentObj[key];
  });
  if (lastKey === undefined) return newObj;

  currentObj[lastKey] = value;
  return newObj;
};

export const objectFindKey = (obj: any, key: string) => {
  let result: any = null;
  Object.keys(obj).forEach((k) => {
    if (k === key) {
      result = obj[k];
    }
  });

  return result !== null;
};

export const objectCompare = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const objectDeepCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const removeArrays = (obj: any) => {
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeArrays(obj[key]);
    }
  }
  return obj;
};

export const getArrayKeys = (obj: any) => {
  const keys = [];

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      keys.push(key);
    }
  }

  return keys;
};

export const filterArrays = (obj: any) => {
  const newObj: any = {};

  for (const key in obj) {
    if (Array.isArray(obj[key]) && obj[key].length > 0) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};
