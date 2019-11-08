import c from 'ansi-colors';
import notifier from './notifier';

export default function errorHandler(error) {
  notifier({ message: error.message, type: 'error' });

  /* eslint-disable no-console */
  console.log(c.red(`\nEError ${error.plugin ? `in plugin "${error.plugin}"` : ':'}`));
  console.log(c.dim(`Message: ${error.message}\n`));
  /* eslint-enable */

  if (this && this.emit) {
    this.emit('end');
  }
}
