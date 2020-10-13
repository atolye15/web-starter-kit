import paths from './paths';

export default {
  content: [`${paths.dist}/*.html`],
  keyframes: true,
  variables: true,
  whitelistPatterns: [/is-[\S]*/g, /has-[\S]*/g],
  // Allow to use special characters in class names like `@, :, %`
  defaultExtractor: (content) => content.match(/[\w-/:%@]+(?<!:)/g) || [],
};
