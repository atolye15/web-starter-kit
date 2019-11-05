import minimist from 'minimist';
import configs from '../../configs';

const argv = minimist(process.argv.slice(2));

export const isProduction = argv.env === 'production';

export const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

export default argv.env;
