import paths from './paths';

export default {
  content: [`${paths.dist}/*.html`],
  keyframes: true,
  variables: true,
  whitelistPatterns: [/is-[\S]*/g, /has-[\S]*/g],
  // Compare class names including '@', '%' and '\'
  defaultExtractor: (content) => content.match(/[a-z-_\\@%0-9]+/g) || [],
};
