import c from 'ansi-colors';

export function logBuildSuccess(cb) {
  // eslint-disable-next-line no-console
  console.log(
    c.green(
      '\n==============================================\n' +
        'Build işlemi başarılı bir şekilde tamamlandı.' +
        '\n==============================================\n',
    ),
  );

  cb();
}

export default {
  buildSuccess: logBuildSuccess,
};
