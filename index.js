var request = require('request')
var fs = require('fs')
var Bagpipe = require('bagpipe')
var cheerio = require('cheerio')
var url = ' http://dpurl.cn/yg366oA'
var imgList = []

var downloadPic = function(src, dest) {
  request(src).pipe(fs.createWriteStream(dest)).on('close', function () {
    console.log('图片已保存')
  })
}

var bagpipe = new Bagpipe(10, {
  timeout: 400
})

request(url, function(err, res, body) {
  if(!err && res.statusCode === 200){
    var $ = cheerio.load(body)
    $('article.content img').each((index, item) => {
      imgList.push($(item).attr('data-ori').replace('750w', '1500w'))
    })
    for (let i = 0; i < imgList.length; i++) {
      bagpipe.push(downloadPic, imgList[i], './imgs/' + i + '.jpg')
    }
  }
})
