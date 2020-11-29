import { CustomRules, Patterns } from '../types';

export const parseCustoms = (customs: CustomRules): Patterns => {
  const patterns: Patterns = [];

  for (const code in customs) {
    let rule = customs[code];

    if (rule instanceof RegExp) {
      const regExp = rule;
      rule = (input) => regExp.test(input);
    }
    patterns.push([rule, code]);
  }

  return patterns;
};
