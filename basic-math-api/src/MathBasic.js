const MathBasic = {
  add: (...args) => {
    if (args.length !== 2) {
      throw new Error('Add function only receive two parameters');
    }

    const [a, b] = args;

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Add function only receive number as parameters');
    }

    return a + b;
  },
  subtract: (...args) => {
    if (args.length !== 2) {
      throw new Error('Add function only receive two parameters');
    }

    const [a, b] = args;

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Add function only receive number as parameters');
    }

    return a - b;
  },
  multiply: (...args) => {
    if (args.length !== 2) {
      throw new Error('Add function only receive two parameters');
    }

    const [a, b] = args;

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Add function only receive number as parameters');
    }

    return a * b;
  },
  divide: (...args) => {
    if (args.length !== 2) {
      throw new Error('Add function only receive two parameters');
    }

    const [a, b] = args;

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Add function only receive number as parameters');
    }

    return a / b;
  },
};

module.exports = MathBasic;
