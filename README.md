# Maoyan-film-picture

抓取并下载猫眼电影图片的原图

## Get started

```bash
npm i maoyan-film-picture
# or
yarn add maoyan-film-picture
```

## Example

```js
var MaoYanFilmPicture = require('maoyan-film-picture')

var maoyan = new MaoYanFilmPicture({
  url: 'https://maoyan.com/films/1211269',
  selector: '.tab-img.tab-content ul li img',
  attr: 'data-src',
  target: '../images'
})

maoyan.start()
```

## License

MIT

