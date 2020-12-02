import { Validator } from './index';

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
