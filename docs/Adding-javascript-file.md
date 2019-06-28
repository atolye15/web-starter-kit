# Adding A Javascript File

Every time you've added a javascript file to your project's `src/js` folder, you need to specify it into `jsFiles` array in your `config.js` file. Only file name and file's extension are needed.

Javascript files listed in `jsFiles` array will be processed by Gulp. Ordering of file names in `jsFiles` array will be regarded while compiling.

```js
    .
    .
    .
  },
  jsFiles: ['main.js', 'your-javascript-file.js'],
  libFiles: [],
  browserSync: {
    .
    .
    .
```
