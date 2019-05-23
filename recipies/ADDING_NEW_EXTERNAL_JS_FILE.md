# Projeye dışarıdan javascript dosyası eklemek

Projeye dışarıdan yeni bir javascript dosyası eklemek için config dosyasına bu javascript dosyasının yolunu belirtmemiz gerekiyor. Bu yolu belirtmek için config dosyasındaki 'libFiles' arrayı kullanılır.

Dosyayı eklerken dosya `src/lib` içerisindeymiş gibi düşümemiz gerekiyor.

```bash
    .
    .
    .
  },
  jsFiles: ['main.js'],
  libFiles: [],
  browserSync: {
    .
    .
    .
```

# Kullanımı

Örnek olarak deneme.js kütüphanesini projenize kurduğunuzu varsayalım.

```bash
    .
    .
    .
  },
  jsFiles: ['main.js'],
  libFiles: ['../../node_modules/deneme/dist/deneme.js'],
  browserSync: {
    .
    .
    .
```

Bu şekilde eklenir.
