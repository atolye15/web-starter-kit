import util from 'gulp-util';

import configs from '../configs';

const today = util.date('dd-mm-yyyy HH:MM');

const authors = configs.info.authors.reduce((pre, cur) => {
  if (pre !== '') {
    pre += '\n';
  }
  return `${pre} * ${cur.name} < ${cur.email} >`;
}, '');

export default function() {
  return [
    '/*!',
    ` * ${configs.info.description}`,
    authors,
    ' * Atölye15 (www.atolye15.com)',
    ` * Version ${configs.info.version} ( ${today} )`,
    ' */\n\n',
  ].join('\n');
}
