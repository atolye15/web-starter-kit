import util from 'gulp-util';

import configs from '../configs';

const today = util.date('dd-mm-yyyy HH:MM');

export default function() {
  return [
    '/*!',
    ` * ${configs.info.description}`,
    ` * Version ${configs.info.version} ( ${today} )`,
    ' */\n\n',
  ].join('\n');
}
