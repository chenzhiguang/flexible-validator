import { Pattern, Patterns } from '../types';

const strlen = (str?: string): number => {
  let count = 0;
  if (str) {
    for (let i = 0, len = str.length; i < len; i++) {
      count += str.charCodeAt(i) < 256 ? 1 : 2;
    }
  }
  return count;
};

const definedMap: { [key: string]: (args: any) => Pattern } = {
  required: (arg): Pattern => {
    return [(input) => input !== undefined, arg === true ? 'required' : arg];
  },

  string: (arg): Pattern => {
    return [
      (input) => typeof input === 'string',
      arg === true ? 'not_string' : arg,
    ];
  },

  number: (arg): Pattern => {
    return [
      (input) => typeof input === 'number' && !isNaN(input),
      arg === true ? 'not_number' : arg,
    ];
  },

  minlen: ([len, code]): Pattern => {
    return [(input) => strlen(input.toString()) >= len, code ?? 'too_short'];
  },

  maxlen: ([len, code]): Pattern => {
    return [(input) => strlen(input.toString()) <= len, code ?? 'too_long'];
  },

  email: (arg): Pattern => {
    return [
      (input) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          input
        );
      },
      arg === true ? 'not_email' : arg,
    ];
  },
};

export const parseDefined = (defined: { [key: string]: any }): Patterns => {
  const patterns: Patterns = [];

  for (const name in defined) {
    if (Object.keys(definedMap).indexOf(name) !== -1) {
      patterns.push(definedMap[name](defined[name]));
    }
  }

  return patterns;
};
