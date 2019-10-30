import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import configs from './configs';
import { isProduction } from './gulp/utils/parseArguments';

const envPath = configs.paths[isProduction ? 'dist' : 'dev'];

export default {
  input: configs.entry.scripts,
  output: {
    file: `${envPath}/${configs.paths.assets.js}/app${isProduction ? '.min' : ''}.js`,
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: !isProduction,
    name: 'App',
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
    isProduction && terser(),
  ],
};
