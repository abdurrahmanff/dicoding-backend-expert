const createServer = require('./createServer');
const FigureCalculator = require('./FigureCalculator');
const MathBasic = require('./MathBasic');

const start = async () => {
  const figureCalculator = new FigureCalculator(MathBasic);
  const server = createServer({
    mathBasic: MathBasic,
    figureCalculator,
  });

  await server.start();

  // eslint-disable-next-line no-console
  console.log(`Server start at ${server.info.uri}`);
};

start();
