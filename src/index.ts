const fs = require('fs')
const request = require('request')
const Bagpipe = require('bagpipe')
const cheerio = require('cheerio')
const path = require('path')

interface MaoYanFilmPicture {
  url: string
  imageList: ImageItem[]
  selector: string
  attr: string
  target: string
  handleSrc: (string: string) => string
  handleName: (src: string) => string
  bagpipe: any
}

interface ImageItem {
  src: string
  name: string
}

interface Options {
  url: string
  selector: string
  attr: string
  timeout: number
  target: string
  handleSrc: (string: string) => string
  handleName: (src: string) => string
}

class MaoYanFilmPicture {
  constructor({ url, selector, attr, timeout = 400, target = './images',
    handleSrc = (string: string) => {
      const temp = string.split('@')
      if (!temp.length) return ''
      return temp[0]
    },
    handleName = (src: string) => {
      const temp = src.split('/')
      if (!temp.length) return ''
      return temp[temp.length - 1]
    }
  }: Options) {
    if (!url) throw new Error('Invalid url')
    if (!selector) throw new Error('Invalid selector')
    if (!attr) throw new Error('Invalid attr')
    if (!target) throw new Error('Please specify a target path')
    this.url = url
    this.imageList = []
    this.selector = selector
    this.attr = attr
    this.target = path.resolve(__dirname, target)
    this.handleSrc = handleSrc
    this.handleName = handleName
    this.bagpipe = new Bagpipe(10, {
      timeout
    })
  }
  start() {
    request(this.url, this.handleRequest.bind(this))
  }
  download(src: string, name: string,  dest: string) {
    request(src)
      .pipe(fs.createWriteStream(dest))
      .on('close', () => console.log(name, 'file saved!'))
  }
  handleRequest(err: Error, res: any, body: string) {
    // console.log(this)
    if(!err && res.statusCode === 200) {
      var $ = cheerio.load(body)
      $(this.selector).each((index: number, item: HTMLImageElement) => {
        const src = this.handleSrc($(item).attr(this.attr))
        if (!src) return
        const name = this.handleName(src)
        this.imageList.push({
          src,
          name
        })
      })
      if (this.imageList && !this.imageList.length) return
      // Using for loop for async function
      for (let i = 0; i < this.imageList.length; i++) {
        const { src, name } = this.imageList[i]
        this.bagpipe.push(this.download, src, name, this.target + '/' + name)
      }
    }
  }
}

export default MaoYanFilmPicture

module.exports = MaoYanFilmPicture


