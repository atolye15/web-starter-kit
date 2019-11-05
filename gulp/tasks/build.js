import { series, parallel } from 'gulp';

import { cleanDist } from './clean';
import html from './html';
import scripts from './scripts';
import styles from './styles';
import copy from './copy';
import { notifyBuildComplete } from './notify';
import { logBuildSuccess } from './log';

export default series(
  cleanDist,
  parallel(html, scripts, copy),
  parallel(styles),
  notifyBuildComplete,
  logBuildSuccess,
);
