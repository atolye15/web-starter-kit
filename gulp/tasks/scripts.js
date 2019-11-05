import { rollup } from 'rollup';
import rollupOptions from '../../rollup.config';

import { notifierErrorHandler } from '../utils/notifier';

const { output: rollupOutputOptions, ...rollupInputOptions } = rollupOptions;

export default function scripts() {
  return rollup(rollupInputOptions)
    .then(bundle => bundle.write(rollupOutputOptions))
    .catch(notifierErrorHandler);
}
