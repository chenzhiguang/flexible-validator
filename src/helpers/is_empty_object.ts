export const isEmptyObject = (obj: unknown): boolean => {
  if (typeof obj !== 'object') {
    return true;
  }

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};
