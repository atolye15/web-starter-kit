import { series } from 'gulp';
import del from 'del';

import { paths } from '../../../kss/configs';

export function clearDist() {
  return del([`${paths.dist}/*`], { dot: true });
}

export default series(clearDist);
