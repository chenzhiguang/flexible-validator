import { Pattern, Patterns, RuleFun } from '../types';
import { isNumber, strlen, uncountable } from './utils';

const definedMap: { [key: string]: (args: any) => Pattern } = {
  string: (arg): Pattern => {
    return [
      (input) => typeof input === 'string',
      arg === true ? 'not_string' : arg,
    ];
  },

  number: (arg): Pattern => {
    return [(input) => isNumber(input), arg === true ? 'not_number' : arg];
  },

  noNull: (arg): Pattern => {
    return [(input) => input !== null, arg === true ? 'is_null' : arg];
  },

  noEmpty: (arg): Pattern => {
    return [(input) => input !== '', arg === true ? 'is_empty' : arg];
  },

  minlen: (arg): Pattern => {
    const [len, error] = Array.isArray(arg) ? arg : [arg];

    return [
      (input) => uncountable(input) || strlen(input.toString()) >= len,
      error ?? 'too_short',
    ];
  },

  maxlen: (arg): Pattern => {
    const [len, error] = Array.isArray(arg) ? arg : [arg];
    return [
      (input) => uncountable(input) || strlen(input.toString()) <= len,
      error ?? 'too_long',
    ];
  },

  email: (arg): Pattern => {
    const rule: RuleFun = (input) => {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        input
      );
    };

    return [rule, arg === true ? 'not_email' : arg];
  },
};

export const parseDefined = (defined: { [key: string]: any }): Patterns => {
  const patterns: Patterns = [];

  for (const name in defined) {
    if (name === 'required') {
      continue;
    }
    if (Object.keys(definedMap).indexOf(name) !== -1) {
      patterns.push(definedMap[name](defined[name]));
    }
  }

  return patterns;
};
