import { series, parallel } from 'gulp';

import { clearDist } from './clear';
import html from './html';
import scripts from './scripts';
import styles from './styles';
import copy from './copy';
import { notifyBuildComplete } from './notify';
import { logBuildSuccess } from './log';

export default series(
  clearDist,
  parallel(html, scripts, copy),
  parallel(styles),
  notifyBuildComplete,
  logBuildSuccess,
);
