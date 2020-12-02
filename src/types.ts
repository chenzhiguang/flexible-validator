export type RuleFun = (input: any) => boolean;
export type CustomRule = RuleFun | RegExp;
export type CustomRules = { [key: string]: CustomRule };

export type Restriction = {
  required?: string | true;
  string?: string | true;
  noNull?: string | true;
  noEmpty?: string | true;
  email?: string | true;
  number?: string | true;
  minlen?: number | [number, string?];
  maxlen?: number | [number, string?];
  use?: CustomRules;
};

export type Pattern = [RuleFun, string];
export type Patterns = Pattern[];
export type Schema = { [key: string]: Restriction };

export type Error = {
  field: string;
  error: string;
};

export type Errors = {
  [key: string]: string[];
};
