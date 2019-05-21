import notifier from '../utils/notifier';

export function notifyBuildComplete(cb) {
  notifier('Build işlemi başarılı bir şekilde tamamlandı.');
  cb();
}

export default { buildComplete: notifyBuildComplete };
