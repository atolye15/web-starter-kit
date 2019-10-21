import functions from '../../twig/functions';

module.exports = Twig => {
  Object.keys(functions).forEach(functionName => {
    Twig.extendFunction(functionName, functions[functionName]);
  });
};
