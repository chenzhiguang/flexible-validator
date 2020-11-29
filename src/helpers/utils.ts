export const strlen = (str?: string): number => {
  let count = 0;
  if (str) {
    for (let i = 0, len = str.length; i < len; i++) {
      count += str.charCodeAt(i) < 256 ? 1 : 2;
    }
  }
  return count;
};

export const isNumber = (input: unknown): boolean =>
  typeof input === 'number' && !isNaN(input);

export const uncountable = (input: unknown): boolean => {
  return isNumber(input) === false && typeof input !== 'string';
};
