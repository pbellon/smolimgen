const indexInArray = <T>(arr: T[], index: number) =>
  index >= 0 && index < arr.length;

export const swap = <T>(arr: T[], a: number, b: number): T[] => {
  if (!indexInArray(arr, a)) {
    throw new Error(`${a} index not in given array`);
  }

  if (!indexInArray(arr, b)) {
    throw new Error(`${a} index not in given array`);
  }

  if (a === b) {
    return arr;
  }

  const newArr = [...arr];
  const aEl = arr[a];
  const bEl = arr[b];
  newArr[a] = bEl;
  newArr[b] = aEl;
  return newArr;
};
