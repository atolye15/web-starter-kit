import path from 'path';
import c from 'ansi-colors';

import baseNotifier from 'node-notifier';
import configs from '../../configs';
import { isProduction } from './parseArguments';

function notifier(message, cb = () => {}) {
  if (isProduction) {
    return cb();
  }

  const defaultOptions = {
    timeout: false,
  };

  if (typeof message === 'string') {
    return baseNotifier.notify(
      {
        ...defaultOptions,
        title: configs.info.name,
        icon: path.join(__dirname, `../assets/gulp.png`),
        message,
      },
      cb,
    );
  }

  return baseNotifier.notify(
    {
      ...defaultOptions,
      title: `${message.type === 'error' ? 'Error ' : ''}${configs.info.name}`,
      icon: path.join(__dirname, `../assets/gulp${message.type === 'error' ? '-error' : ''}.png`),
      ...message,
    },
    cb,
  );
}

export function notifierErrorHandler(error) {
  notifier({ message: error.message, type: 'error' });

  /* eslint-disable no-console */
  console.log(c.red(`\nError ${error.plugin ? `in plugin "${error.plugin}"` : ':'}`));
  console.log(c.dim(`Message: ${error.message}`));
  /* eslint-enable */

  return this.emit('end');
}

export default notifier;
