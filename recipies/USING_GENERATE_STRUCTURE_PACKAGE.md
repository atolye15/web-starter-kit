# Generate Structure paketini kullanmak

Sürekli kullandığınız kod yapılarını üretebilmek için `generate-structure` paketini kullanabilirsiniz.


## Kurulum

Kullandığınız paket yöneticisiyle `generate-structure` paketini projenizin geliştirme ortamına (development environment) ekleyin.

yarn 
```
yarn add -D generate-structure
```

npm 
```
npm install generate-structure --save-dev
```


## Şablonlar

Şablon oluşturmak için [buradaki](https://github.com/tugaybaltaci/generate-structure#creating-template) dökümanı okuyabilirsiniz.

[Örnek şablonlar](https://github.com/tugaybaltaci/generate-structure/tree/master/example-templates)'a buradan ulaşabilirsiniz.


## Kullanım

Şablonlarınızı terminal üzerinden aşağıdaki komut ile üretebilirsiniz.

```
yarn generate-structure -t path/to/template.html structureName
```

Örn:
```
yarn generate-structure -t src/templates/component.html product-card
```

---

**Bu komutları `package.json` dosyanıza ekleyerek süreci hızlandırabilirsiniz.**

```json
"scripts": {
  ...
  "gs:component": "yarn generate-structure -t src/templates/component.html",
  "gs:page": "yarn generate-structure -t src/templates/page.html"
  ...
}
```

Örnek kullanım:

```
yarn gs:component product-card
```
