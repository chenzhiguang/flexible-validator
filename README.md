# flexible-validator

A light weight and flexible data validator for projects in
`javascript`, `typescript`, `node.js`

## Installation

```bash
npm i flexible-validator
```

## Useabe

_typescript examples_

```typescript
import { Validator } from 'flexible-validator';

const validator = new Validator({
  username: {
    required: true,
    string: true,

    minlen: [3, 'too short'],
    maxlen: [20, 'too long'],
  },
  age: {
    required: true,
    number: true,
    use: {
      'Too young': (input) => {
        return input >= 18;
      },
    },
  },
  email: {
    required: 'Please enter your email!',
    email: true,
  },
  password: {
    minlen: 6,
    maxlen: 20,
    use: {
      'must contain an uppercase letter': /[A-Z]+/,
    },
  },
});

const data = {
  // NOTE: if a vaulue is undefined and the require is NOT true, the other
  // patterns of this field will be skipt
  username: undefined,
  //username: 'ok',

  email: 'email',
  age: 10,
  password: '0000',
};

// Run all the validation patterns and output all the errors
const resultAll = validator.validateAll(data);

// Only return the first error and stop
const resultFirst = validator.validate(data);

console.log(resultAll);
console.log(resultFirst);
```

## Methods

_Note: returns `null` means pass the validation._

### Validator.validateAll

```typescript
validateAll({[key:string]:any}): null | [key: string]: string[];
```

### Validator.validate

```typescript
validate({[key:string]:any}): null | {field:string, error:string}
```

## Pre-defined patterns

### `required: true | string`

```typescript
// Return with defualt error message
{
  required: true,
}

// Return with custom error message
{
  required: 'custom your error message here',
}
```

### `minlen: number | [number, string?]`

```typescript
{
  minlen: 3,
}

//
{
  minlen: [3, 'at least 3 characters']
}
```

### `maxlen: number | [number, string?]`

```typescript
{
  minlen: 20,
}

//
{
  minlen: [20, 'too long']
}
```

### `number: true | string`

```typescript
{
  number: true,
}

//
{
  number: "wrong format",
}
```

### `string: true | string`

```typescript
{
  string: true,
}

//
{
  string: "not a string",
}
```

### `email: true | string`

```typescript
{
  email: true,
}

//
{
  email: "wrong format",
}
```

### `noNull: true | string`

```typescript
{
  noNull: true,
}

//
{
  noNull: "Null is not allowed",
}
```

### `noEmpty: true | string`

NOTE: This is only used to check empty `string` in this moment  
TODO: Check empty `object` and object `array` later when there is `array`
and `object` options

```typescript
{
  noEmpty: true,
}

//
{
  noNull: "It is empty",
}
```
