# Atölye15 Web Starter Kit
Web Starter Kit Atolye15 Front-end developerları için hazırlanmış bir başlangıç paketidir. Temel amacı her proje başlangıçlarında yapılan rutin işlerden sizi kurtarmak ve Front-end geliştiriciler arasında senkronizasyonu sağlamaktır. [Atölye15 CSS Stil Rehberi](http://gitlab.atolye15.net/frontend/atolye15-style-guide/blob/master/css-style-guilde.md) kuralları çerçevesinde yazılmıştır.

## Kurulum ?

Web Starter Kit'i [buradan](http://gitlab.atolye15.net/frontend/starter-kit/tags) indirebilirsiniz yada

```bash
git clone git@gitlab.atolye15.net:frontend/starter-kit.git project-name
cd project-name
```
git clone yaparak repoyu belirttiğiniz(`project-name`) klasöre clonlayabilirsiniz.

## Başlangıç
Web Starter Kit ile yeni bir projeye başlayabilmeniz için bilgisayarınızda

- [Node.js](http://nodejs.org/)
- [Npm](https://www.npmjs.org/)
- [Ruby](https://www.ruby-lang.org/)
- [Git](http://git-scm.com/)

kurulu olmalıdır.

Projenizde kullanacağınız bağımlılıkları

```bash
npm install
```
komutu ile kurabilirsiniz.

Bağımlılıkları indirdikten sonra terminalinizde;

```bash
grunt watch
```
komutunu yazarak grunt izlemeyi başlatabilirsiniz.

## Projeyi Gitlab a yüklemek

[gitlab.atolye15.net](gitlab.atolye15.net) e giriş yaptıktan sonra, sağ üst menüden `New Project` butonuna tıklayarak projenizi oluşturunuz.
Buradan projenizin gitlab ayarlarını yaparak `Create project` butonuna tıklayınız.
Projenizi oluşturduktan SSH bölümünde yazan
```bash
git@gitlab.atolye15.net:username/project-name.git
```
repo adresini kopyalayıp, bilgisayarınızda terminalinizi açıp, proje klasörünüzün içine girin
daha sonra projenizin remote adresini değiştirmek için
```bash
git remote set-url origin git@gitlab.atolye15.net:username/project-name.git
```
kodunu girerek yeni remote adresinizi local projenize tanımlayın.
Projenizdeki dosyaları remote a atmak için
```bash
git push origin --all
```
yazmanız yeterli olacaktır. Projenizde eğer tag oluşturmuşsanız veya mevcut tagları remote a yüklemek isterseniz
```bash
git push origin --tags
```
komutu ile taglarınızı remote a atabilirsiniz.

## Bower Kullanımı
Projenizde kullanacağınız kütüphaneleri [Bower](http://bower.io/) kullanarak projenize çok kolay dahil edebilirsiniz. Kütüphaneleri projenize dahil etmek için `bower.json` dosyasının içerisine kütüphane ismini girmelisiniz(Kütüphaneleri [http://bower.io/search/](http://bower.io/search/) dan aratabilirsiniz), karşısına da kütüphanenin hangi sürümünü indirmek istediğinizi girmelisiniz. (Kütüphanenin son sürümünü indirmek için genel olarak `*` kullanınız.)
Daha sonra terminalinizde
```bash
bower install
```
yazarak belirttiğiniz kütüphaneleri indirebilirsiniz.

[Bower](http://bower.io/) kullanımı hakkında daha detaylı bilgi için şu makaleyi inceleyebilirsiniz.
[http://akademi.atolye15.com/post/73516641491/bower-nedir](http://akademi.atolye15.com/post/73516641491/bower-nedir)

