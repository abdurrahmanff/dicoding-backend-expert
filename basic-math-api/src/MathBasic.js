const MathBasic = {
  validateArguments: (args) => {
    if (args.length !== 2) {
      throw new Error('Function only receive two parameters');
    }

    const [a, b] = args;

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Function only receive number as parameters');
    }

    return args;
  },
  add: (...args) => {
    const [a, b] = MathBasic.validateArguments(args);
    return a + b;
  },
  subtract: (...args) => {
    const [a, b] = MathBasic.validateArguments(args);
    return a - b;
  },
  multiply: (...args) => {
    const [a, b] = MathBasic.validateArguments(args);
    return a * b;
  },
  divide: (...args) => {
    const [a, b] = MathBasic.validateArguments(args);
    return a / b;
  },
};

module.exports = MathBasic;
