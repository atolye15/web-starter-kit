# Atölye15 Web Starter Kit
Web Starter Kit Atolye15 Front-end developerları için hazırlanmış bir başlangıç paketidir. Temel amacı her proje başlangıçlarında yapılan rutin işlerden sizi kurtarmak ve Front-end geliştiriciler arasında senkronizasyonu sağlamaktır. [Atölye15 CSS Stil Rehberi](http://gitlab.atolye15.net/frontend/atolye15-style-guide/blob/master/css-style-guilde.md) kuralları çerçevesinde yazılmıştır.

## İçerisinde neler mevcut ?
 - Twig (HTML Template Sitemi)
 - Sass (CSS extension language)
 - Autoprefixer
 - Css media queryleri gruplama
 - Resimleri optimize etme
 - Babel ile ES2015 (JavaScript compiler)
 - Eslint (Javascript Lint)
 - Minifications
 - Sourcemaps
 - Responsive boilerplate

## Sistem Gereksinimleri
Web Starter Kit ile yeni bir projeye başlayabilmeniz için bilgisayarınızda aşağıda listelenen gereksinimler yüklü olmalıdır.
- [Node.js](http://nodejs.org/)
- [Npm (Node Package Manager)](https://www.npmjs.org/)
- [Ruby](https://www.ruby-lang.org/)
- [Sass](http://sass-lang.com/install/)
- [Git](http://git-scm.com/)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Kurulum ?

1. Web Starter Kit'in güncel halini [buradan](http://gitlab.atolye15.net/frontend/web-starter-kit/repository/archive.zip?ref=master) indirin yada
```bash
git clone git@gitlab.atolye15.net:frontend/web-starter-kit.git proje-klasoru
```
şeklinde klonlayın.

2. İndirdiğiniz/Klonladığınız klasöre girin. Terminal ile
```bash
cd Desktop/Dev/proje-klasoru
# Projeye temiz bir git geçmişi ile başlamak için
# clone repoyu silelim ve tekrar oluşturalım
rm -rf .git
git init
# Dosyaları commitleyelim
git add -A
git commit -m "İlk Commit"
```
3. Projenizde kullanacağınız bağımlılıkları
```bash
npm install
# npm install da sorun yaşarsanız, bu komutu kullanın.
sudo npm install
```
komutu ile kurabilirsiniz.

4. Bağımlılıkları indirdikten sonra terminalinizde;
```bash
gulp build # Geliştirme ortamını develop moda hazırlar
gulp serve # watch işlemlerini başlatır.
```
komutunu yazarak grunt izlemeyi başlatabilirsiniz.

## Klasör Yapısı
```html
root
├── dev
├── dist
├── .tmp
├── src
│   ├── fonts
│   ├── img
│   ├── js
│   ├── libs
│   ├── sass
│   ├── twig
│   └── vendors
├── .babelrc
├── .editorconfig
├── .gitattributes
├── .gitignore
├── bower.json
├── config.js
├── gulpfile.babel.js
└── package.json
```
* `dev` Development ortamında build işlemi dosyaları bu klasör içerisine oluşturur.
* `prod` Production ortamında build işlemi dosyaları bu klasör içerisinde oluşturur.
* `.tmp` Bu klasör minification ve compile işlemleri için yedekleme klasörüdür. Sistem tarafından kullanılır. Kaynak dosyalara yeni bir ekleme olduğunda sistem sadece yeni eklenmiş dosya üzerinde işlem yaparak bu dosyayı işlenmiş dosyaların içerisine atar. Bu sayede gereksiz yere tekrardan tüm dosyaların işlenmesinin önüne geçilmek amaçlanmıştır.
* `src` Kaynak kodların bulunduğu klasördür
* `src/js` Javascript (babel) dosyalarının bulunduğu klasördür. Burada oluşturduğunuz dosyalar **config.js** da **jsFiles** değişkeni içerisinde **sadece dosya adları** yazılarak sisteme dahil edilir.
* `src/fonts` Font dosyaları bu klasör içerinde bulunur.
* `src/img` Resim dosyaları bu klasör içerisinde bulunur.
* `libs` Projeye dahil edilecek Javascript dosyaları. Bu klasör sadece javascript dosyaları içermelidir. Burada eklediğiniz dosyalar **config.js** da **libFiles** değişkeni içerisinde **sadece dosya adları** yazılarak sisteme dahil edilir.
* `sass` Scss dosyaları bu klasör içerisinde bulunur. Bu klasör içerisindeki klasörlerinde özelliklerine [Buradan](gitlab.atolye15.net/frontend/atolye15-style-guide/blob/master/css-style-guilde.md#dosya-yapisi) ulaşabilirsiniz.
* `tpl` HTML Template dosyaları bu klasörde bulunur.
* `vendors` Projeye dışarıdan eklenecek eklentiler bu klasörde bulunur. Buraya eklenen dosyalara sistem tarafından hiçbir müdehale olmaz. Sistem sadece vendors klasörünü dist adresine taşıyacaktır. Genellikle kople kütüphane klasörlerini projeye eklemek için kullanılmalıdır. Eğer ekliyeceğiniz kütüphanenin sadece javascript ve css dosyası varsa, javascript dosyasını **libs** klasörüne, css dosyasını **sass/plugins** klasörüne (_plugin-name.scss dosya ismi ile) ekleyip. javascript dosyasını **config.js** de, css dosyasını **sass/plugins.scss** de import ederek sisteme dahil edin.

> Çalışma Mantığı Bölümünde yukarıdaki klasörler ve dosyalar hakkında detaylı bilgileri bulabilirsiniz.

## Projeyi Gitlab a yüklemek
[gitlab.atolye15.net](http://gitlab.atolye15.net) e giriş yaptıktan sonra, sağ üst menüden **New Project** butonuna tıklayarak projenizi oluşturunuz.
Buradan projenizin gitlab ayarlarını yaparak **Create project** butonuna tıklayınız.
Projenizi oluşturduktan SSH bölümünde yazan
```bash
git@gitlab.atolye15.net:frontend/project-name.git
```
repo adresini kopyalayıp, bilgisayarınızda terminalinizi açıp, proje klasörünüzün içine girin.
Projenizin remote adresini eklemek için;
```bash
git remote add origin git@gitlab.atolye15.net:frontend/project-name.git
```
kodunu girerek yeni remote adresinizi local projenize tanımlayın.

Projenizdeki dosyaları remote a atmak için
```bash
git push origin --all
```
yazmanız yeterli olacaktır.

Projenizde eğer tag oluşturmuşsanız veya mevcut tagları remote a yüklemek isterseniz
```bash
git push origin --tags
```
komutu ile taglarınızı remote a atabilirsiniz.

---

## Gulp Kullanımı
Gulp Node.Js ile çalışan, terminal aracılığı ile konrol ettiğimiz bir görev çalıştırıcısıdır. Web geliştirme sürecinde elle yaptığımız rutin işleri üzerine alarak bu işleri otomatikleştirir ve Front-end geliştirme yükünü hafifletir.

### Gulp Kurulumu
Gulp kullabilmek için Node.Js kurulu olması gereklidir. Node.Js Kurulumunu yaptıktan sonra
```bash
npm install --global gulp
```
komutu ile Gulp'ı yükleyebilirsiniz.

### Gulp Taskları

#### gulp build
Bu görev projeyi çalışma ortamına göre belirlenen hedef klasöre hazırlar.
Eğer komutun sonuna `--prod` eklenirse çalışma ortamı production, hiç bir şey yazılmaz ise development olarak belirlenir.

#### gulp serve
Geliştirme modunda twig, sass, resim ve babel javascript dosyaların izleyerek, değişimleri halinde derleme işlemini gerçekleştirir.

#### gulp clean:dist
Çalışma ortamına göre belirlenen hedef klasörün içerisini temizler.

#### gulp clean:imgCache
Minify edilip `.tmp/img` içerisine yedeklenmiş resim dosyalarını temizler.

#### gulp clean:babelCache
Derlenip `.tmp/babel` içerisine yedeklenmiş javascript dosyalarını temizler.

## Bower Kullanımı

Projenizde kullanacağınız kütüphaneleri [Bower](http://bower.io/) kullanarak projenize çok kolay dahil edebilirsiniz.
Komut satırına
```bash
bower install jquery --save
```
yazarak kütüphaneleri yükleyebilirsiniz. Eğer hazır bir bower.json dosyasına sahipseniz
```bash
bower install
```
komutunu çalıştırmanız yeterli olacaktır.

[Bower](http://bower.io/) kullanımı hakkında daha detaylı bilgi için şu makaleyi inceleyebilirsiniz.
[http://akademi.atolye15.com/post/73516641491/bower-nedir](http://akademi.atolye15.com/post/73516641491/bower-nedir)
