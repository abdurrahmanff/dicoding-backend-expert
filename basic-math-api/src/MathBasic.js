const MathBasic = {
  add: (...args) => {
    if (args.length !== 2) {
      throw new Error('Add function only receive two parameters');
    }

    const [a, b] = args;

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Add function only receive number as parameters');
    }
  },
  subtract: () => {

  },
  multiply: () => {

  },
  divide: () => {

  },
};

module.exports = MathBasic;
