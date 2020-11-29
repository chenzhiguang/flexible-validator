export type RuleFun = (input: any) => boolean;
export type CustomRule = RuleFun | RegExp;
export type CustomRules = { [key: string]: CustomRule };

export type Restriction = {
  required?: string | true;
  string?: string | true;
  email?: string | true;
  number?: string | true;
  minlen?: number | [number, string?];
  maxlen?: number | [number, string?];
  use?: CustomRules;
};

export type Pattern = [RuleFun, string];
export type Patterns = Pattern[];
export type Restrictions = { [key: string]: Restriction };

export type ErrorData = {
  field: string;
  code: string;
};
