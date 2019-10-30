import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

// eslint-disable-next-line import/prefer-default-export
export const isProduction = argv.prod;
