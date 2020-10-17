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

## Options

#### url: string;

猫眼电影链接

#### selector: string;

页面的选择器

#### attr: string;

选择器所选 dom 节点所需的属性

#### timeout: number;

内置 bagpipe 的超时时间，默认为 400

#### target: string;

保存的图片的路径

#### handleSrc: (string: string) => string;

针对获取到的 src 的处理函数，有内置，支持用户自定义

#### handleName: (src: string) => string;

针对 src 里提取出图片文件名的逻辑函数，有内置，支持用户自定义

## License

MIT

