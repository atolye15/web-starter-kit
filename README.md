# Atölye15 - Web Starter Kit

Web Starter Kit, Atölye15 Front-end developerları için hazırlanmış bir başlangıç paketidir. Temel amacı her proje başlangıcında yapılan rutin işlerden sizi kurtarmak ve Frontend geliştiriciler arasında senkronizasyonu sağlamaktır.

[TOCM]

[TOC]

## İçeriği

- Twig (HTML Template Sistemi)
- Sass (CSS extension language)
- Babel ile ES2015 (Javascript compiler)
- Eslint
- Stylelint

ve daha fazlası

## Sistem Gereksinimleri

- [Node.js](http://nodejs.org/)
- [Yarn (Yarn Package Manager)](https://yarnpkg.com/lang/en/)
- [Git](http://git-scm.com/)

### Browser Desteği

- Chrome
- Edge
- Firefox
- Safari

## Özellikler

| Özellik                     | Açıklama                                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Kolay Başlangıç             | Kurulumu tamamladıktan sonra hemen kod yazmaya başlayabilirsiniz.                                           |
| Sass Desteği                | Proje SASS compilera sahiptir. Temel değişkenler mixinler fonksiyonlar hazır olarak eliniz de bulunmaktadır |
| Performans Optimizasyonları | Resimlerin küçültülmesi, js ve css dosyalarının min halleri çıktı olarak verilmektedir                      |
| HTML template engine        | Template engine olarak twig.js kullanır. Standart HTML ile boğulmamanızı sağlar                             |
| Code Linting                | Stylelint ve eslint için gerekli linter configleri ayarlanmış olup. Sizin standardınız belirlenmiştir       |
| ES2015 Support              |                                                                                                             |

## Kurulum

### 1. Web Starter Kit'in güncel halini [buradan](https://github.com/atolye15/web-starter-kit) indirin yada.

```bash
git clone git@github.com:atolye15/web-starter-kit.git proje-klasoru
```

### 2. İndirdiğiniz/Klonladığınız klasörü githuba hazırlamak.

```bash
cd proje-klasoru

# Projeye temiz bir git geçmişi ile başlamak için clone repoyu silelim ve tekrar oluşturalım.
rm -rf .git
git init

# İlk commitimizi atalım.
git add -A
git commit -m "İlk Commit"
```

### 3. Projenizde Kullanacağınız Bağımlılıklar

Projenizde kullanılan bağımlılıkları kurmak için,

```bash
yarn

# yarn komutunda sorun yaşarsanız, bu komutu kullanın.
sudo yarn
```

### 4. Projeyi başlatma

```bash
# Geliştirme ortamını ve styleguide' ı başlatır ve watch işlemini başlatır.
yarn start
```

### 5. Projeyi Github' a yüklemek

```bash
git remote add origin git@gitlab.atolye15.net:frontend/project-name.git
```

kodunu girerek yeni remote adresinizi local projenize tanımlayın.

Projenizdeki dosyaları remote a atmak için

```bash
git push origin --all
```

yazmanız yeterli olacaktır.

## Dökümantasyon

### 1. Klasör Yapısı

```
root
├── .tmp/                 # Bu klasör minification ve compile işlemleri için yedekleme klasörüdür. Sistem tarafından kullanılır.
├── dev/                  # Development ortamında build işlemi dosyaları bu klasör içerisine oluşturur.
├── dist/                 # Production ortamında build işlemi dosyaları bu klasör içerisinde oluşturur.
├── .vscode/              # Visual Studio Code için gerekli ayarlar tutulur.
├── gulp/                 # Bütün gulp tasksları bu klasör için de bulunur.
│     ├── assets/         # Gulp Tasklarında kullanılacak static assetsler bu klasör içinde bulunur.
│     ├── tasks/          # Gulp tasklarının hepsi bu dosya içinde bulunur.
│     └── utils/          # Gulp tasklarının ihtiyaç duyduğu bütün utils fonksiyonları bu dosya içinde bulunur.
├── kss/                  # Styleguide için kullanılan kss paketinin ayarları tutulur.
├── src/                  # Geliştirme ortamının bulunduğu dosyalar. Bu dosyalar gulp tarafından derlenip dev/ ve dist/ dosyaları oluşturur.
│     ├── fonts/          # Proje için gerekli font dosyaların derlenmesi için bu dosya içine atılır.
│     ├── img/            # Proje için gerekli resimler bu dosya içine atılır.
│       └── icons/        # Proje için svg iconların derlenebilmesi için svg iconları bu dosyada tutulur.
│     ├── js/             # Projede kullanılan javascript dosyalarının derlenmesi için js dosyaları bu dosya içinde tutulur.
│     ├── libs/           # Projeye dahil edilecek Javascript dosyaları. Bu klasör sadece javascript dosyaları içermelidir. Burada eklediğiniz dosyalar config.js da libFiles değişkeni içerisinde sadece dosya adları yazılarak sisteme dahil edilir.
│     ├── scss/           # Scss dosyaları bu klasör içerisinde bulunur.
│       ├── abstracts/
│         └── mixins/
│       ├── base/
│         └── utilities/
│       ├── components/
│       ├── objects/
│       ├──pages/
│       └── vendors/
│     ├── vendors/        # Projeye dışarıdan eklenecek eklentiler bu klasörde bulunur. Buraya eklenen dosyalara sistem tarafından hiçbir müdehale olmaz. Sistem sadece vendors klasörünü dist adresine taşıyacaktır.
├── twig/                 # Projenin twig dosyaları bu klasör içinde bulunuyor.
│   ├── page-contents/
│   ├── pages/
│   └── partials/
├── .babelrc
├── .browserlistrc
├── .editorconfig
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .stylelintignore
├── .stylelintrc
├── .archive.sh
├── CHANGELOG.md
├── config.js
├── gulpfile.babel.js
├── package.json
├── README.md
├── yarn.lock
```

### 2. Komutlar

Gerekli Komutları,

```bash
yarn [komut-ismi]
```

yazarak çalıştırabilirsiniz.

| Komut               | Açıklama                                                           |
| :------------------ | ------------------------------------------------------------------ |
| node_modules-chmod  | node_modules dosyasını 777 iznini ayarlar                          |
| start-server        | serveri elle başlatır                                              |
| lint                | lint:js ve lint:css komutlarını çalıştırır.                        |
| lint:js             | eslint'i javascript dosyaları için çalıştırır                      |
| lint:css            | stylelint' i scss dosyaları için çalıştırır                        |
| format              | format:js ve format:css komutlarını çalıştırır                     |
| format:js           | prettier' ı javascript dosyaları için çalıştırır                   |
| format:css          | prettier' ı scss dosyaları için çalıştırır                         |
| gulp                | gulp komutunu çalıştırır                                           |
| generate-svg-sprite | image:sprite task' ını çalıştırır                                  |
| build-styleguide    | styleguide' ı build eder                                           |
| build               | projeyi develop modda build eder                                   |
| build-prod          | projeyi production modda build eder                                |
| deploy              | projeyi deploy eder                                                |
| deploy-prod         | projeyi production moduyla beraber deploy eder                     |
| start               | projeyi başlatır. styleguide' ı oluşturur. watch işlemini başlatır |
| start-prod          | projeyi production modunda başlatır                                |
| start-deploy        | projeyi deploy modunda başlatır                                    |
| start-deploy-prod   | projeyi deploy ve production moduyla beraber başlatır              |
| publish-github      | projeyi github pages ile publish eder                              |

### 3. Örnek Kullanımlar

| Kullanım                                                                                | Açıklama                                                                                |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Iconların kullanımı](recipies/ADDING_NEW_ICON.md)                                      | Projenin içinde iconların nasıl yükleneceği ve kullanacağını açıklar                    |
| [Yeni bir javascript dosyası oluşturmak](recipies/ADDING_NEW_JS_FILE.md)                | Projenin içinde yeni bir javascript dosyası oluşturulduğunda neler yapılacağını açıklar |
| [Yeni bir kütüphane eklendiğinde yapılacaklar](recipies/ADDING_NEW_EXTERNAL_JS_FILE.md) | Projeye yeni bir kütüphane yüklendiğinde neler yapılacağını açıklar                     |

## License

Web Starter Kit is MIT license
