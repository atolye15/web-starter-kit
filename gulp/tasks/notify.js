import notifier from '../utils/notifier';

// eslint-disable-next-line import/prefer-default-export
export function notifyBuildComplete(cb) {
  notifier('Build işlemi başarılı bir şekilde tamamlandı.');
  cb();
}
