# Atölye15 Web Starter Kit
Web Starter Kit Atolye15 Front-end developerları için hazırlanmış bir başlangıç paketidir. Temel amacı her proje başlangıçlarında yapılan rutin işlerden sizi kurtarmak ve Front-end geliştiriciler arasında senkronizasyonu sağlamaktır. [Atölye15 CSS Stil Rehberi](http://gitlab.atolye15.net/frontend/atolye15-style-guide/blob/master/css-style-guilde.md) kuralları çerçevesinde yazılmıştır.

## İçerisinde neler mevcut ?
 - HTML Template Sitemi
 - Sass
 - Autoprefixer
 - CSS Minification
 - Resimleri optimize etme
 - Coffee Script
 - JSHint

## Sistem Gereksinimleri
Web Starter Kit ile yeni bir projeye başlayabilmeniz için bilgisayarınızda
- [Node.js](http://nodejs.org/)
- [Npm (Node Package Manager)](https://www.npmjs.org/)
- [Ruby](https://www.ruby-lang.org/)
- [Sass](http://sass-lang.com/install/)
- [Git](http://git-scm.com/)
- [Grunt](http://gruntjs.com/getting-started/)

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
```
komutu ile kurabilirsiniz.

4. Bağımlılıkları indirdikten sonra terminalinizde;
```bash
grunt mode:dev # Geliştirme ortamını develop moda hazırlar
grunt watch
```
komutunu yazarak grunt izlemeyi başlatabilirsiniz.

## Klasör Yapısı
```html
root
├── dev
├── prod
├── preprocess
├── src
│   ├── coffee
│   ├── fonts
│   ├── img
│   ├── libs
│   ├── sass
│   ├── tpl
│   └── vendors
├── .gitignore
├── .jshintrc
├── bower.json
├── config.json
├── package.json
└── Gruntfile.coffee
```
* `dev` Development modunda Grunt dosyaları bu klasör içerisine oluşturur. Geliştirme modunda `http://localhost/dev` adresinde proje çalıştırılır.
* `prod` Production modunda Grunt dosyaları bu klasör içerisinde oluşturur. Geliştirme modunda `http://localhost/prod` adresinde proje çalıştırılır.
* `preprocess` Ara işlemlerin yapıldığı klasördür. Bu klasör grunt tarafından kullanılmaktadır.
* `src` Kaynak kodların bulunduğu klasördür
* `src/coffee` CoffeeScript dosyalarının bulunduğu klasördür. Burada oluşturduğunu dosyalar **config.json** da **coffeeFiles** değişkeni içerisinde dosya yolları yazılarak sisteme dahil edilir.
* `src/fonts` Font dosyaları bu klasör içerinde bulunur.
* `src/img` Resim dosyaları bu klasör içerisinde bulunur.
* `libs` Projeye dışarıdan eklenecek eklentiler bu klasörde bulunur.
* `sass` Scss dosyaları bu klasör içerisinde bulunur. Bu klasör içerisindeki klasörlerinde özelliklerine [Buradan](gitlab.atolye15.net/frontend/atolye15-style-guide/blob/master/css-style-guilde.md#dosya-yapisi) ulaşabilirsiniz.
* `tpl` HTML Template dosyaları bu klasörde bulunur.
* `vendors` Projeye dahil edilecek Javascript dosyaları.

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

## Grunt Kullanımı
Grunt Node.Js ile çalışan, terminal aracılığı ile konrol ettiğimiz bir görev çalıştırıcısıdır. Web geliştirme sürecinde elle yaptığımız rutin işleri üzerine alarak bu işleri otomatikleştirir ve Front-end geliştirme yükünü hafifletir.

### Grunt Kurulumu
Grunt kullabilmek için Node.Js kurulu olması gereklidir. Node.Js Kurulumunu yaptıktan sonra
```bash
npm install -g grunt-cli
```
komutu ile Grunt ı yükleyebilirsiniz.

### Grunt Taskları

#### grunt deploy
Bu görev projeyi sunuma hazırlar.  Ana dizinde bir assets klasörü oluşturur ve sunuma hazır haldeki css, js dosyalarını ve resimleri bu klasör içine kopyalar. Kök dizine de html sayfalarını oluştutur.

#### grunt build
Bu görev de deploy ile aynı işlemleri yapar sadece html derlemelerini yapmaz.

#### grunt compressimg
Resim dosyalarını sıkıştırır ve assests/img klasörüne kopyalar.

#### grunt mode:dev, grunt mode:live
Projenin hangi ortamda olduğunu belirlemek için kullanılır. Geliştirme modunu ektif etmek için;
```bash
grunt mode:dev
```
Sahne modunu etkinleştirmek için;
```bash
grunt mode:live
```
görevleri çalıştırılır.

#### grunt watch
Geliştirme modunda tpl, sass ve coffee script dosyaların izleyerek, değişimleri halinde derleme işlemini gerçekleştirir.
> Bu görevi sadece geliştirme modu aktif iken kullanabilirsiniz.

#### grunt ftp_push
Dosyalarınızı ftp protokolünü kullanarak sunucuya atmanızı sağlar. Bu görevi kullanabilmek için Grunt dosyasında bazı ayarlamaları yapmanız gereklidir.
ilk olarak kök dizine .ftpauth adında bir dosya oluşturup içerisine
```json
{
  "key": {
    "username": "username",
    "password": "pass"
  }
}
```
şeklinde ftp kullanıcı adı ve şifremizi eklememiz gerekli. Daha sonra Grunt.coffee dosyasında
```json
authKey: 'key'
host: "hots-name",
dest: "/project-folder-name"
```
alanlarını düzenlememiz gereklidir.

#### grunt copy:bowerComponents
ClassList, html5shiv, jQuery, Bootstrap gibi kullanılan temel kütüphane dosyalarını bower klasöründen src/ klasörüne belirlediğimiz yollara kopyalar.
> Bu görevi çalıştırmadan önce bower install yapıp kütüphaneleri indiriniz.

#### grunt clean:dist
Sunuma hazırlanmış dosya ve klasörleri temizler. Silinen dosya ve klasörler;

 - assets/
 - Kök dizindeki tüm html dosyaları
 - src/css/style.css
 - src/css/style.css.map
 - src/js/main.js
 - src/coffee/output/*.js

## Bower Kullanımı

Projenizde kullanacağınız kütüphaneleri [Bower](http://bower.io/) kullanarak projenize çok kolay dahil edebilirsiniz. Kütüphaneleri projenize dahil etmek için `bower.json` dosyasının içerisine kütüphane ismini girmelisiniz(Kütüphaneleri [http://bower.io/search/](http://bower.io/search/) dan aratabilirsiniz), karşısına da kütüphanenin hangi sürümünü indirmek istediğinizi girmelisiniz. (Kütüphanenin son sürümünü indirmek için genel olarak `*` kullanınız.)
Daha sonra terminalinizde
```bash
bower install
```
yazarak belirttiğiniz kütüphaneleri indirebilirsiniz.

[Bower](http://bower.io/) kullanımı hakkında daha detaylı bilgi için şu makaleyi inceleyebilirsiniz.
[http://akademi.atolye15.com/post/73516641491/bower-nedir](http://akademi.atolye15.com/post/73516641491/bower-nedir)


