import { rollup } from 'rollup';
import errorHandler from '../../utils/errorHandler';

import rollupOptions from '../../../kss/rollup.config';

const { output: rollupOutputOptions, ...rollupInputOptions } = rollupOptions;

export default function scripts() {
  return rollup(rollupInputOptions)
    .then(bundle => bundle.write(rollupOutputOptions))
    .catch(errorHandler);
}
