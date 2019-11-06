import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import configs from '../configs';
import { paths } from './configs';

export default {
  input: configs.entry.scripts,
  output: {
    file: `${paths.dist}/${paths.assets.scripts}/app.js`,
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
    name: 'App',
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
};
