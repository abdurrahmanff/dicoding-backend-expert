class FigureCalculator {
  constructor(mathBasic) {
    this.mathBasic = mathBasic;
  }

  calculateRectanglePerimeter(...args) {
    if (args.length !== 2) {
      throw new Error('Functions only receive 2 parameters');
    }

    const [length, width] = args;

    if (typeof length !== 'number' || typeof width !== 'number') {
      throw new Error('Functions only receive number as parameter');
    }

    return this.mathBasic.multiply(2, this.mathBasic.add(length, width));
  }

  calculateRectangleArea(...args) {
    if (args.length !== 2) {
      throw new Error('Functions only receive 2 parameters');
    }

    const [length, width] = args;

    if (typeof length !== 'number' || typeof width !== 'number') {
      throw new Error('Functions only receive number as parameter');
    }

    return this.mathBasic.multiply(length, width);
  }

  calculateTrianglePerimeter(...args) {
    if (args.length !== 3) {
      throw new Error('Functions only receive 3 parameters');
    }

    const [a, b, c] = args;

    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
      throw new Error('Functions only receive number as parameter');
    }

    return this.mathBasic.add(this.mathBasic.add(a, b), c);
  }

  calculateTriangleArea(...args) {
    if (args.length !== 2) {
      throw new Error('Functions only receive 2 parameters');
    }

    const [base, height] = args;

    if (typeof base !== 'number' || typeof height !== 'number') {
      throw new Error('Functions only receive number as parameter');
    }

    return this.mathBasic.divide(this.mathBasic.multiply(base, height), 2);
  }
}

module.exports = FigureCalculator;
