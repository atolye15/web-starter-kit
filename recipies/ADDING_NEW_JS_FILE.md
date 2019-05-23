# Projeye yeni javascript dosyası eklemek

`src/js` klasörüne yeni bir javascript dosyası eklendiğinde bunu projeye bildirmemiz gerekiyor. Bunu bildirmek için root dizindeki config.js dosyasındaki jsFiles array' ine
bu dosyayı eklememiz gerekiyor. dosyayı sadece adı ve uzantısıyla eklemek yeterlidir. Geri kalan birleştirme işlemlerini gulp kendi halledecektir. Burada dosyaları array'a ekleme sırası önem taşımaktadır.

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

## Kullanımı

Örnek olarak start.js dosyası eklediğimizi varsayalım.

config dosyasına eklenmesi,

```bash
    .
    .
    .
  },
  jsFiles: ['main.js', 'start.js'],
  libFiles: [],
  browserSync: {
    .
    .
    .
```

bu şekilde olacaktır.
