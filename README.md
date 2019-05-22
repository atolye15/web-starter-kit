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

## Sistem Gereksinimleri

- [Node.js](http://nodejs.org/)
- [Yarn (Yarn Package Manager)](https://yarnpkg.com/lang/en/)
- [Git](http://git-scm.com/)

## Kurulum

### 1. Web Starter Kit'in güncel halini [buradan](https://github.com/atolye15/web-starter-kit) indirin yada.

```bash
git clone git@github.com:atolye15/web-starter-kit.git proje-klasoru
```

### 2. İndirdiğiniz/Klonladığınız klasöre girin.

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

|-- \
|---- [.tmp/](#1-tmp) \
|---- dev/ \
|---- dist/ \
|---- .vscode/ \
|---- gulp/ \
|-------- assets/ \
|-------- tasks/ \
|-------- utils/ \
|---- kss/ \
|---- src/ \
|-------- fonts/ \
|-------- img/ \
|------------ icons/ \
|-------- js/ \
|-------- libs/ \
|-------- scss/ \
|------------ abstracts/ \
|---------------- mixins/ \
|------------ base/ \
|----------------/utilities\ \
|------------ components/ \
|------------ objects/ \
|------------ pages/ \
|------------ vendors/ \
|-------- twig/ \
|------------ page-contents/ \
|------------ pages/ \
|------------ partials/ \
|-------- vendors/ \
|---- .babelrc \
|---- .browserlistrc \
|---- .editorconfig \
|---- .eslintrc.json \
|---- .gitattributes \
|---- .gitignore \
|---- .prettierignore \
|---- .prettierrc \
|---- .stylelintignore \
|---- .stylelintrc \
|---- .archive.sh \
|---- CHANGELOG.md \
|---- config.js \
|---- gulpfile.babel.js \
|---- package.json \
|---- README.md \
|---- yarn.lock

#### 1. .tmp/

Bu klasör minification ve compile işlemleri için yedekleme klasörüdür. Sistem tarafından kullanılır.

#### 2. dev/

Development ortamında build işlemi dosyaları bu klasör içerisine oluşturur.

#### 3. dist/

Production ortamında build işlemi dosyaları bu klasör içerisinde oluşturur.

#### 4. .vscode/

Visual Studio Code için gerekli ayarlar tutulur.

#### 5. gulp/

Bütün gulp tasksları bu klasör için de bulunur.

##### 5.1 gulp/assets

Gulp Tasklarında kullanılacak static assetsler bu klasör içinde bulunur.

##### 5.2 gulp/taks

Gulp tasklarının hepsi bu dosya içinde bulunur.

##### 5.3 gulp/utils

Gulp tasklarının ihtiyaç duyduğu bütün utils fonksiyonları bu dosya içinde bulunur.

#### 6. kss/

Styleguide için kullanılan kss paketinin ayarları tutulur.

#### 7. src/

Geliştirme ortamının bulunduğu dosyalar. Bu dosyalar gulp tarafından derlenip dev/ ve dist/ dosyaları oluşturur.

##### 7.1 src/fonts/

Proje için gerekli font dosyaların derlenmesi için bu dosya içine atılır.

##### 7.2 src/img/

Proje için gerekli resimler bu dosya içine atılır.

###### 7.2.1 src/img/icons/

Proje için svg iconların derlenebilmesi için svg iconları bu dosyada tutulur.

##### 7.3 src/js/

Projede kullanılan javascript dosyalarının derlenmesi için js dosyaları bu dosya içinde tutulur.

##### 7.4 src/libs/

Projeye dahil edilecek Javascript dosyaları. Bu klasör sadece javascript dosyaları içermelidir. Burada eklediğiniz dosyalar config.js da libFiles değişkeni içerisinde sadece dosya adları yazılarak sisteme dahil edilir.

##### 7.5 src/scss/

Scss dosyaları bu klasör içerisinde bulunur.

###### 7.5.1 src/scss/abstract/

Temel scss dosyaları bu klasör içerisinde bulunur

###### 7.5.1.1 src/scss/abstract/mixins/

Temel scss mixinleri bu klasör içerisinde bulunur.

###### 7.5.2 src/scss/base/

Proje için kullanılan temel işlevlerin bulunduğu klasördür.

###### 7.5.2.1 src/scss/base/utilities/

Proje için tanımlanan utilitiesler bu klasör içinde bulunur.

###### 7.5.3 src/scss/components/

Projenin componentleri bu klasör içerisinde bulunur.

###### 7.5.4 src/scss/objects/

Proje için gerekli object dosyaları bu klasör içinde bulunur.

###### 7.5.5 src/scss/pages/

Proje sayfaları için gerekli scss dosyaları u klasör de bulunur.

###### 7.5.6 src/scss/vendors/

Proje için dışarıdan gerekli scss kütüphaneleri bu klasör içine eklenir.

##### 7.6 src/twig/

Projenin twig dosyaları bu klasör içinde bulunuyor.

###### 7.6.1 src/twig/page-contents/

###### 7.6.2 src/twig/pages/

###### 7.6.3 src/partials

##### 7.7 src/vendors/

Projeye dışarıdan eklenecek eklentiler bu klasörde bulunur. Buraya eklenen dosyalara sistem tarafından hiçbir müdehale olmaz. Sistem sadece vendors klasörünü dist adresine taşıyacaktır.

#### 8. .babelrc

#### 9. .browserlistrc

#### 10. .editorconfig

#### 11. .eslintrc.json

#### 12. .gitattributes

#### 13. .gitignore

#### 14. .prettierignore

#### 15. .prettierrc

#### 16. .stylelintignore

#### 17. .stylelintrc

#### 18. .archive.sh

#### 19. CHANGELOG.md

#### 20. config.js

#### 21. gulpfile.babel.js

#### 22. package.json

#### 23. README.md

#### 24. yarn.lock

### 2. Komutlar

Gerekli Komutları,

```bash
yarn [komut-ismi]
```

yazarak çalıştırabilirsiniz.

| Komut               | Açıklama                                                           |
| :------------------ | ------------------------------------------------------------------ |
| node_modules-chmod  | node_modules dosyası için gerekli izinleri ayarlar                 |
| start-server        | serveri elle başlatır                                              |
| lint                | lint:js ve lint:css komutlarını çalıştırır.                        |
| lint:js             | eslint'i javascript dosyaları için çalıştırır                      |
| lint:css            | stylelint' i scss dosyaları için çalıştırır                        |
| fmt                 | fmt:js ve fmt:css komutlarını çalıştırır                           |
| fmt:js              | prettier' ı javascript dosyaları için çalıştırır                   |
| fmt:css             | prettier' ı scss dosyaları için çalıştırır                         |
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

## License

Web Starter Kit is MIT license
