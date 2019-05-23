# Projeye Yeni Icon Eklemek

Web Starter Kit icon kullanımı için svg sprite kullanmaktadır.

Projeye yeni bir icon dahil edip kullanmak için gerekli işlemler;

SVG iconun optimizasyon işlemlerinden sonra src/img/icons klasörüne svg uzantılı dosyayı atınız.
Gulp işlemleri ../icons dosyasını okuyup gerekli işlemleri yapacaktır. Iconlarınızı projede kullanmak için

```bash
<svg class="icon}">
  <use xlink:href="#icon-[icon-ismi]"></use>
</svg>
```

şeklinde kullanabilirsiniz.
