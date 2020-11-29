import { Validator } from './index';

const validator = new Validator({
  username: {
    required: true,
    string: true,
    minlen: [4, 'too short'],
    maxlen: [20, 'too long'],
  },
  age: {
    number: true,
    use: {
      'Too young': (input) => {
        console.log(input);
        return input < 18;
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
    use: {},
  },
});

const data = {
  //username: undefined,
  age: 10,
};

// Run all the validation patterns and output all the errors
const resultAll = validator.validate(data);

// Only return the first error and stop
const resultFirst = validator.validateFirst(data);

console.log(resultAll);
console.log(resultFirst);
