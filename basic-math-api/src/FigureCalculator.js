class FigureCalculator {
  constructor(mathBasic) {
    this.mathBasic = mathBasic;
  }

  static validateArguments(args, expectedLength) {
    if (args.length !== expectedLength) {
      throw new Error(`Functions only receive ${expectedLength} parameters`);
    }

    args.forEach((arg) => {
      if (typeof arg !== 'number') {
        throw new Error('Functions only receive number as parameter');
      }
    });

    return args;
  }

  calculateRectanglePerimeter(...args) {
    const [length, width] = FigureCalculator.validateArguments(args, 2);

    return this.mathBasic.multiply(2, this.mathBasic.add(length, width));
  }

  calculateRectangleArea(...args) {
    const [length, width] = FigureCalculator.validateArguments(args, 2);

    return this.mathBasic.multiply(length, width);
  }

  calculateTrianglePerimeter(...args) {
    const [a, b, c] = FigureCalculator.validateArguments(args, 3);

    return this.mathBasic.add(this.mathBasic.add(a, b), c);
  }

  calculateTriangleArea(...args) {
    const [base, height] = FigureCalculator.validateArguments(args, 2);

    return this.mathBasic.divide(this.mathBasic.multiply(base, height), 2);
  }
}

module.exports = FigureCalculator;
