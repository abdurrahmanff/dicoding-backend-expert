const createServer = require('./createServer');
const FigureCalculator = require('./FigureCalculator');
const MathBasic = require('./MathBasic');

describe('A HTTP Server', () => {
  describe('when GET /add', () => {
    it('should respond with a status code of 200 and the payload value is addition result of a and b correctly', async () => {
      // Arrange
      const a = 10;
      const b = 20;
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/add/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(30);
      expect(spyAdd).toBeCalledWith(a, b);
    });
  });

  describe('when GET /subtract', () => {
    it('should respond with a status code of 200 and the payload value is subtraction result of a and b correctly', async () => {
      // Arrange
      const a = 12;
      const b = 8;
      const spySubtract = jest.spyOn(MathBasic, 'subtract');
      const server = createServer({ mathBasic: MathBasic });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/subtract/${a}/${b}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(4); // a - b
      expect(spySubtract).toBeCalledWith(a, b);
    });
  });

  describe('when GET /multiply', () => {
    it('should respond with a status code of 200 and the payload value is multiplication result of a and b correctly', async () => {
      // Arrange
      const a = 3;
      const b = 8;
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const server = createServer({ mathBasic: MathBasic });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/multiply/${a}/${b}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(24); // a * b
      expect(spyMultiply).toBeCalledWith(a, b);
    });
  });

  describe('when GET /divide', () => {
    it('should respond with a status code of 200 and the payload value is division result of a and b correctly', async () => {
      // Arrange
      const a = 9;
      const b = 3;
      const spyDivide = jest.spyOn(MathBasic, 'divide');
      const server = createServer({ mathBasic: MathBasic });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/divide/${a}/${b}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(3); // a / b
      expect(spyDivide).toBeCalledWith(a, b);
    });
  });

  describe('when GET /rectangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is calculation of rectangle perimeter correctly', async () => {
      // Arrange
      const length = 4;
      const width = 4;

      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateRectanglePerimeter = jest.spyOn(figureCalculator, 'calculateRectanglePerimeter');
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const server = createServer({ mathBasic: MathBasic, figureCalculator });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/perimeter/${length}/${width}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(16);
      expect(spyCalculateRectanglePerimeter).toBeCalledWith(length, width);
      expect(spyAdd).toBeCalledWith(4, 4);
      expect(spyMultiply).toBeCalledWith(2, 8);
    });
  });

  describe('when GET /rectangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is calculation of rectangle perimeter correctly', async () => {
      // Arrange
      const length = 4;
      const width = 4;

      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateRectanglePerimeter = jest.spyOn(figureCalculator, 'calculateRectanglePerimeter');
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const server = createServer({ mathBasic: MathBasic, figureCalculator });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/perimeter/${length}/${width}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(16);
      expect(spyCalculateRectanglePerimeter).toBeCalledWith(length, width);
      expect(spyAdd).toBeCalledWith(length, width);
      expect(spyMultiply).toBeCalledWith(2, 8);
    });
  });

  describe('when GET /rectangle/area', () => {
    it('should respond with a status code of 200 and the payload value is calculation of rectangle area correctly', async () => {
      // Arrange
      const length = 9;
      const width = 9;

      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateRectangleArea = jest.spyOn(figureCalculator, 'calculateRectangleArea');
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const server = createServer({ mathBasic: MathBasic, figureCalculator });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/area/${length}/${width}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(81);
      expect(spyCalculateRectangleArea).toBeCalledWith(length, width);
      expect(spyMultiply).toBeCalledWith(length, width);
    });
  });

  describe('when GET /triagle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is calculation of triangle perimeter correctly', async () => {
      // Arrange
      const a = 4;
      const b = 6;
      const c = 5;

      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateTrianglePerimeter = jest.spyOn(figureCalculator, 'calculateTrianglePerimeter');
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const server = createServer({ mathBasic: MathBasic, figureCalculator });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/triangle/perimeter/${a}/${b}/${c}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(15);
      expect(spyCalculateTrianglePerimeter).toBeCalledWith(a, b, c);
      expect(spyAdd).toBeCalledWith(a, b);
      expect(spyAdd).toBeCalledWith(10, c);
    });
  });

  describe('when GET /triagle/area', () => {
    it('should respond with a status code of 200 and the payload value is calculation of triangle area correctly', async () => {
      // Arrange
      const base = 4;
      const height = 6;

      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateTriangleArea = jest.spyOn(figureCalculator, 'calculateTriangleArea');
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const spyDivide = jest.spyOn(MathBasic, 'divide');
      const server = createServer({ mathBasic: MathBasic, figureCalculator });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/triangle/area/${base}/${height}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(12);
      expect(spyCalculateTriangleArea).toBeCalledWith(base, height);
      expect(spyMultiply).toBeCalledWith(base, height);
      expect(spyDivide).toBeCalledWith(24, 2);
    });
  });
});
