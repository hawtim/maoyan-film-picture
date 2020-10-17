"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var request = require('request');
var Bagpipe = require('bagpipe');
var cheerio = require('cheerio');
var path = require('path');
var MaoYanFilmPicture = (function () {
    function MaoYanFilmPicture(_a) {
        var url = _a.url, selector = _a.selector, attr = _a.attr, _b = _a.timeout, timeout = _b === void 0 ? 400 : _b, _c = _a.target, target = _c === void 0 ? './images' : _c, _d = _a.handleSrc, handleSrc = _d === void 0 ? function (string) {
            var temp = string.split('@');
            if (!temp.length)
                return '';
            return temp[0];
        } : _d, _e = _a.handleName, handleName = _e === void 0 ? function (src) {
            var temp = src.split('/');
            if (!temp.length)
                return '';
            return temp[temp.length - 1];
        } : _e;
        if (!url)
            throw new Error('Invalid url');
        if (!selector)
            throw new Error('Invalid selector');
        if (!attr)
            throw new Error('Invalid attr');
        if (!target)
            throw new Error('Please specify a target path');
        this.url = url;
        this.imageList = [];
        this.selector = selector;
        this.attr = attr;
        this.target = path.resolve(__dirname, target);
        this.handleSrc = handleSrc;
        this.handleName = handleName;
        this.bagpipe = new Bagpipe(10, {
            timeout: timeout
        });
    }
    MaoYanFilmPicture.prototype.start = function () {
        request(this.url, this.handleRequest.bind(this));
    };
    MaoYanFilmPicture.prototype.download = function (src, name, dest) {
        request(src)
            .pipe(fs.createWriteStream(dest))
            .on('close', function () { return console.log(name, 'file saved!'); });
    };
    MaoYanFilmPicture.prototype.handleRequest = function (err, res, body) {
        var _this = this;
        if (!err && res.statusCode === 200) {
            var $ = cheerio.load(body);
            $(this.selector).each(function (index, item) {
                var src = _this.handleSrc($(item).attr(_this.attr));
                if (!src)
                    return;
                var name = _this.handleName(src);
                _this.imageList.push({
                    src: src,
                    name: name
                });
            });
            if (this.imageList && !this.imageList.length)
                return;
            for (var i = 0; i < this.imageList.length; i++) {
                var _a = this.imageList[i], src = _a.src, name_1 = _a.name;
                this.bagpipe.push(this.download, src, name_1, this.target + '/' + name_1);
            }
        }
    };
    return MaoYanFilmPicture;
}());
exports.default = MaoYanFilmPicture;
module.exports = MaoYanFilmPicture;
