import path from 'path';

import baseNotifier from 'node-notifier';
import configs from '../../configs';
import { isProduction } from './env';

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

export default notifier;
