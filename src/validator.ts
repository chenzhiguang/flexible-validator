import { parseCustoms } from './helpers/parse_customs';
import { parseDefined } from './helpers/parse_defined';
import { Patterns, Schema, Error, Errors } from './types';

export class Validator {
  private schema: Schema = {};
  private restrictions: { [key: string]: Patterns } = {};

  constructor(schema: Schema) {
    this.schema = schema;
    for (const field in schema) {
      let patterns: Patterns = [];
      const restrictions = schema[field];
      const { use: customs, ...defined } = restrictions;
      patterns = patterns.concat(parseDefined(defined));
      if (customs) {
        patterns = patterns.concat(parseCustoms(customs));
      }
      this.restrictions[field] = patterns;
    }
  }

  validate(fields: { [key: string]: any }, first?: boolean): null | Errors {
    const result: Errors = {};
    let hasError = false;

    for (const field in fields) {
      const patterns = this.restrictions[field];
      if (!patterns) {
        continue;
      }

      const errors: string[] = [];
      const input = fields[field];
      const required = this.schema[field].required;

      if (input === void 0) {
        if (required) {
          result[field] = [required === true ? 'required' : required];
        }
        if (first === true) {
          return result;
        }
        continue;
      }

      for (const [rule, error] of patterns) {
        if (false === rule(input)) {
          hasError = true;
          errors.push(error);
          result[field] = errors;
          if (first === true) {
            return result;
          }
        }
      }
    }

    return hasError ? result : null;
  }

  validateFirst(fields: { [key: string]: any }): null | Error {
    const result = this.validate(fields, true);

    if (result !== null) {
      for (const field in result) {
        return { field, error: result[field][0] };
      }
    }
    return null;
  }
}
