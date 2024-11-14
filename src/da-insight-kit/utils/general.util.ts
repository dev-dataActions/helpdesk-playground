export function getSum(entry: any, keys: string[] = []): number | null {
  if (!entry) return null;
  const sum = keys.reduce((total, key) => {
    return total + (entry[key] ?? 0);
  }, 0);
  return sum;
}

export function getChange(entries: any[], keys: string[] = []): number {
  const a = getSum(entries[entries.length - 1], keys) ?? 0;
  const b = Math.max(1, getSum(entries[entries.length - 2], keys) ?? 0);

  return parseInt((((a - b) / b) * 100).toFixed(1));
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const groupArraysOfObjectsByIndex = (arr1: any[] = [], arr2: any[] = []): any[] => {
  const len = Math.max(arr1.length, arr2.length);
  const groupedArr: any[] = [];
  for (let i = 0; i < len; i++) {
    groupedArr.push({
      ...(arr1[i] ?? {}),
      ...(arr2[i] ?? {}),
    });
  }
  return groupedArr;
};

export const groupObjectsByKeys = (arr: any[] = [], keys: string[] = []): any[] => {
  const res: { [key: string]: any } = {};
  arr.forEach((e) => {
    const uniqueKey = keys.map((key) => e[key]).join("-");
    res[uniqueKey] = {
      ...(res[uniqueKey] ?? {}),
      ...e,
    };
  });
  return Object.values(res);
};

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const classNames = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(" ");

export const getChangeInPercent = (a: number, b: number): string => {
  return (((a - b) / b) * 100).toFixed(2);
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const filterUndefinedKeys = (obj: any): any => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};

export const valueFormatter = (number: number) => {
  if (isNaN(number) || number === null || number === undefined) {
    return "N/A";
  }

  if (number === 0) return 0;
  if (number < 1) return parseFloat(number + "")?.toFixed(3);

  // Define the scale suffixes and their corresponding multipliers
  const scales = [
    { value: 1, suffix: "" },
    { value: 1e3, suffix: "K" },
    { value: 1e6, suffix: "M" },
    { value: 1e9, suffix: "B" },
  ];

  // Loop through the scales and find the appropriate scale for formatting
  for (let i = scales.length - 1; i >= 0; i--) {
    const scale = scales[i];
    if (Math.abs(number) >= scale.value) {
      // Format the number with commas and append the scale suffix
      const formattedNumber = (number / scale.value).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${formattedNumber} ${scale.suffix}`;
    }
  }
};
