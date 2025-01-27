import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export function getSum(entry, keys = []) {
  if (!entry) return null;
  const sum = keys.reduce((total, key) => {
    return (total += entry[key] ?? 0);
  }, 0);
  return sum;
}

export function getChange(entries, keys = []) {
  const a = getSum(entries[entries.length - 1], keys);
  const b = Math.max(1, getSum(entries[entries.length - 2], keys));

  return (((a - b) / b) * 100).toFixed(1);
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const groupArraysOfObjectsByIndex = (arr1 = [], arr2 = []) => {
  let len = Math.max(arr1?.length, arr2?.length);
  const groupedArr = [];
  for (let i = 0; i < len; i++) {
    groupedArr.push({
      ...(arr1?.[i] ?? {}),
      ...(arr2?.[i] ?? {}),
    });
  }
  return groupedArr;
};

export const groupObjectsByKeys = (arr = [], keys = []) => {
  const res = {};
  arr.forEach((e) => {
    const unkey = keys.map((key) => e[key]).join("-");
    res[unkey] = {
      ...(res[unkey] ?? {}),
      ...e,
    };
  });
  return Object.values(res);
};

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

export const getUniqueName = (options = {}) => {
  return uniqueNamesGenerator({
    dictionaries: options.dictionaries ?? [colors, adjectives, animals],
    style: options.stype ?? "capital",
    separator: options.separator ?? " ",
    length: options.length ?? 2,
  });
};

export const getChangeInPercent = (a, b) => {
  return (((a - b) / b) * 100).toFixed(2);
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const filterUndefinedKeys = (obj) => {
  const newObj = {};
  Object.keys(obj).map((key) => {
    if (obj[key]) newObj[key] = obj[key];
  });
  return newObj;
};
