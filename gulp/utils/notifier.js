import path from 'path';
import c from 'ansi-colors';

import baseNotifier from 'node-notifier';
import configs from '../../configs';
import { isProduction } from './parseArguments';

/**
 * 1. Due to a bug in `node-notifier` we have to set timeout to 3,
 * otherwise even though the task is finished, the promise cannot resolve before ten seconds passed.
 *
 * TODO: After the pull request to be merged set timeout to false.
 *
 * Related Issue: https://github.com/mikaelbr/node-notifier/issues/218
 * Related Pull Request: https://github.com/mikaelbr/node-notifier/pull/271
 */

function notifier(message, cb = () => {}) {
  if (isProduction) {
    return cb();
  }

  const defaultOptions = {
    timeout: 3, // [1]
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
