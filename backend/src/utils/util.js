const isEmpty = (value) => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (value !== null && typeof value === "object" && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

const isUndefined = (value) => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else {
    return false;
  }
};

const exclude = (key, obj) => {
  // eslint-disable-next-line no-unused-vars
  const { [key]: omitted, ...rest } = obj;
  return rest;
};

const excludeAll = (key, obj) => {
  const excludeObj = new Set(key);
  return Object.fromEntries(Object.entries(obj).filter((e) => !excludeObj.has(e[0])));
};

module.exports = {
  isEmpty: isEmpty,
  isUndefined: isUndefined,
  exclude: exclude,
  excludeAll: excludeAll,
};
