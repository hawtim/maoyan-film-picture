var MaoYanFilmPicture = require('../dist/index')

var maoyan = new MaoYanFilmPicture({
  url: 'https://maoyan.com/films/1211269',
  selector: '.tab-img.tab-content ul li img',
  attr: 'data-src',
  target: '../images'
})

maoyan.start()