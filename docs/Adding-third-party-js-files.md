# Adding Third Party Javascript Files

In order to add external Javascript files to your project, you need to specify their path in `config.js` under `libFiles` key. While doing this your current path will be relative to `src/lib`.

```bash
    .
    .
    .
  },
  jsFiles: ['main.js'],
  libFiles: ['../../node_modules/[package-name]/dist/[package-name].js'],
  browserSync: {
    .
    .
    .
```
