import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

export const isProduction = argv.prod;
export const isDeploy = argv.deploy;
