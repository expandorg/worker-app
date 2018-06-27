// @flow

export const range = (count: number): Array<number> => (
  [...Array(count).keys()]
);

export const rangeFrom = (from: number, to: number): Array<number> => (
  [...range(to - from).map((_, i) => i + from)]
);


export const removeAt = (array: Array<any>, index: number) => (
  [...array.slice(0, index), ...array.slice(index + 1)]
);
