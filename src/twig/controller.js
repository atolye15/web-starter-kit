/**
 * Twig Controller
 * Front-end tarafında Twig dosyalarının HTML e render edilmesi
 * sırasında kullanılacak değişkenler ve fonksiyonlar
 *
 * @type {Object}
 */

var twigController = {
  data : {
    locale: "tr",
    title: "Hello, Boys!"
  },
  functions: [
    {
      name: 'assets',
      func: (args) => {
        return args;
      }
    }
  ],
  filters: []
};

module.exports = twigController;
