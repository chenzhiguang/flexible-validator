import { parseCustoms } from './helpers/parse_customs';
import { parseDefined } from './helpers/parse_defined';
import { Patterns, Restrictions, ErrorData } from './types';

export class Validator {
  private restrictions: { [key: string]: Patterns } = {};

  constructor(schema: Restrictions) {
    let patterns: Patterns = [];

    for (const field in schema) {
      const restrictions = schema[field];
      const { use: customs, ...defined } = restrictions;
      patterns = patterns.concat(parseDefined(defined));
      if (customs) {
        patterns = patterns.concat(parseCustoms(customs));
      }
      this.restrictions[field] = patterns;
    }
  }

  validate(
    fields: { [key: string]: any },
    first?: boolean
  ): null | ErrorData[] {
    const result: ErrorData[] = [];

    for (const field in fields) {
      const patterns = this.restrictions[field];
      if (!patterns) {
        continue;
      }

      const input = fields[field];
      for (const [rule, code] of patterns) {
        if (false === rule(input)) {
          const error: ErrorData = { field, code };
          if (first !== false) {
            return [error];
          } else {
            result.push(error);
          }
        }
      }
    }

    return result.length > 0 ? result : null;
  }

  validateFirst(fields: { [key: string]: any }): null | ErrorData {
    const result = this.validate(fields, true);
    return result === null ? null : result[0];
  }
}
