# Adding An Icon

Web Starter Kit uses SVG sprites for icons.

After completing SVG icon optimizations, place your icon with `.svg` extension into `src/img/icons` folder. Gulp will perform the necessary processes.

## Usage

```html
<svg class="icon">
  <use xlink:href="#icon-[icon-name]"></use>
</svg>
```
