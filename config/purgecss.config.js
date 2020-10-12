import paths from './paths';

export default {
  content: [`${paths.dist}/*.html`],
  keyframes: true,
  variables: true,
  extractors: [
    {
      extractor: (content) => {
        return content.match(/[a-z-_\\@%0-9]+/g) || []; // Compare class names including '@', '%' and '\'
      },
      extensions: ['css', 'html'],
    },
  ],
};
