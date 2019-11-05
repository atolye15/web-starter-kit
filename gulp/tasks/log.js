import c from 'ansi-colors';

// eslint-disable-next-line import/prefer-default-export
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
