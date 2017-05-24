'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

var _jsonHash = require('json-hash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = (0, _bluebird.promisify)(_request2.default);

exports.default = function (userOptions) {

  var options = (0, _extends3.default)({
    destination: 'cached',
    sources: []
  }, userOptions);

  var imagecache = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var _path;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return cache(req.path, req.query);

            case 3:
              _path = _context.sent;


              res.sendFile(_path);

              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);


              console.log(_context.t0);

              res.status(404).send(_context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 7]]);
    }));

    return function imagecache(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var cache = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(urlpath, query) {
      var hash, filepath, format, ext, cachedPath, url;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              hash = (0, _jsonHash.digest)({ urlpath: urlpath, query: query });
              filepath = urlpath.split('/').pop().split('.').pop();
              format = query.fm || filepath;
              ext = getFormat(format);
              cachedPath = _path3.default.resolve(options.destination, hash + '.' + ext);

              if (!_fs2.default.existsSync(cachedPath)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', cachedPath);

            case 7:
              _context2.next = 9;
              return getUrl(urlpath);

            case 9:
              url = _context2.sent;
              _context2.next = 12;
              return process(url, cachedPath, query);

            case 12:
              return _context2.abrupt('return', cachedPath);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function cache(_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getFormat = function getFormat(format) {

    if (format === 'png') return 'png';

    if (format === 'bmp') return 'bmp';

    return 'jpg';
  };

  var getUrl = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(urlpath) {
      var url;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _bluebird.reduce)(options.sources, function (found, host) {

                if (found !== null) return found;

                return testUrl(host + urlpath);
              }, null);

            case 2:
              url = _context3.sent;

              if (url) {
                _context3.next = 5;
                break;
              }

              throw new Error('Not Found');

            case 5:
              return _context3.abrupt('return', url);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function getUrl(_x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var testUrl = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(url) {
      var response;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return request(url);

            case 2:
              response = _context4.sent;

              if (!(response && response.statusCode && response.statusCode == 200)) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt('return', url);

            case 5:
              return _context4.abrupt('return', null);

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function testUrl(_x7) {
      return _ref4.apply(this, arguments);
    };
  }();

  var process = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(url, filepath, params) {
      var data, image;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _jimp2.default.read(url);

            case 2:
              data = _context5.sent;

              if (!params.op) {
                _context5.next = 9;
                break;
              }

              _context5.next = 6;
              return (0, _bluebird.reduce)(params.op, function (data, op) {
                return transform(data, op);
              }, data);

            case 6:
              _context5.t0 = _context5.sent;
              _context5.next = 12;
              break;

            case 9:
              _context5.next = 11;
              return transform(data, params);

            case 11:
              _context5.t0 = _context5.sent;

            case 12:
              image = _context5.t0;
              _context5.next = 15;
              return new _bluebird2.default(function (resolve, reject) {
                return image.write(filepath, function () {
                  return resolve();
                });
              });

            case 15:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function process(_x8, _x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var transform = function transform(image, params) {

    if (params.bri) image = brightness(image, params.bri);

    if (params.con) image = contrast(image, params.con);

    if (params.flip) image = flip(image, params.flip);

    if (params.col) image = colorize(image, params.col);

    if (params.blur) image = blur(image, params.blur);

    if (params.pad) image = padding(image, params.pad);

    if (params.bg) image = background(image, params.bg);

    if (params.border) image = border(image, params.border);

    if (params.hue) image = hue(image, params.hue);

    if (params.sat) image = saturation(image, params.sat);

    if (params.tint) image = tint(image, params.tint);

    if (params.shade) image = shade(image, params.shade);

    if (params.invert) image = invert(image, params.invert);

    if (params.rot) image = rotate(image, params.rot);

    if (params.crop) image = crop(image, params.crop);

    if (params.fit || params.w || params.h) image = resize(image, params.fit, params.w, params.h, params.ha, params.va, params.dpi);

    return image;
  };

  var brightness = function brightness(image, value) {

    if (value < -100 || value > 100) return image;

    var delta = parseFloat(value) / 100;

    return image.brightness(delta);
  };

  var contrast = function contrast(image, value) {

    if (value < -100 || value > 100) return image;

    var delta = parseFloat(value) / 100;

    return image.contrast(delta);
  };

  var flip = function flip(image, value) {

    if (value.match(/^[vh]{1,2}$/) === null) return image;

    var horz = value.match(/h/) !== null;

    var vert = value.match(/v/) !== null;

    return image.flip(horz, vert);
  };

  var colorize = function colorize(image, value) {

    if (value == 'greyscale') return image.greyscale();

    if (value == 'sepia') return image.sepia();

    return image;
  };

  var blur = function blur(image, value) {

    var radius = parseInt(value);

    if (radius < 1 || radius > 100) return image;

    return image.blur(radius);
  };

  var padding = function padding(image, value) {

    var padding = parseInt(value);

    if (padding < 1) return image;

    var img = new _jimp2.default(image.bitmap.width + padding * 2, image.bitmap.height + padding * 2, 0x00000000);

    return img.composite(image, padding, padding);
  };

  var background = function background(image, value) {

    var color = (0, _tinycolor2.default)(value);

    if (!color.isValid()) return image;

    var hex = parseInt(color.toHex8(), 16);

    var img = new _jimp2.default(image.bitmap.width, image.bitmap.height, hex);

    return img.composite(image, 0, 0);
  };

  var border = function border(image, value) {

    var matches = value.match(/(\d*),(\w*)/);

    if (!matches) return image;

    var _matches = (0, _slicedToArray3.default)(matches, 3),
        borderValue = _matches[1],
        hexValue = _matches[2];

    var color = (0, _tinycolor2.default)(hexValue);

    var border = parseInt(borderValue);

    if (!color.isValid()) return image;

    var hex = parseInt(color.toHex8(), 16);

    var verticalBorder = new _jimp2.default(border, image.bitmap.height, hex);

    var horizontalBorder = new _jimp2.default(image.bitmap.width - border * 2, border, hex);

    return image.composite(verticalBorder, 0, 0).composite(verticalBorder, image.bitmap.width - border, 0).composite(horizontalBorder, border, 0).composite(horizontalBorder, border, image.bitmap.height - border);
  };

  var hue = function hue(image, value) {

    var degrees = parseInt(value);

    if (degrees === 0 || degrees < -360 || degrees > 360) return image;

    return image.color([{ apply: 'hue', params: [degrees] }]);
  };

  var saturation = function saturation(image, value) {

    var amount = parseInt(value);

    if (amount === 0 || amount < -100 || amount > 100) return image;

    if (amount < 0) return image.color([{ apply: 'desaturate', params: [Math.abs(amount)] }]);

    if (amount > 0) return image.color([{ apply: 'saturate', params: [amount] }]);
  };

  var tint = function tint(image, value) {

    var amount = parseInt(value);

    if (amount < 1 || amount > 100) return image;

    return image.color([{ apply: 'tint', params: [amount] }]);
  };

  var shade = function shade(image, value) {

    var amount = parseInt(value);

    if (amount < 1 || amount > 100) return image;

    return image.color([{ apply: 'shade', params: [amount] }]);
  };

  var invert = function invert(image, value) {

    if (value !== 'true') return image;

    return image.invert();
  };

  var rotate = function rotate(image, value) {

    if (value < 1 || value > 359) return image;

    var degrees = parseInt(value);

    var ow = image.bitmap.width;

    var oh = image.bitmap.height;

    var angle = degrees * (Math.PI / 180);

    var quadrant = Math.floor(angle / (Math.PI / 2)) & 3;

    var sign_alpha = (quadrant & 1) === 0 ? angle : Math.PI - angle;

    var alpha = (sign_alpha % Math.PI + Math.PI) % Math.PI;

    var bb = {
      w: ow * Math.cos(alpha) + oh * Math.sin(alpha),
      h: ow * Math.sin(alpha) + oh * Math.cos(alpha)
    };

    var gamma = ow < oh ? Math.atan2(bb.w, bb.h) : Math.atan2(bb.h, bb.w);

    var delta = Math.PI - alpha - gamma;

    var length = ow < oh ? oh : ow;

    var d = length * Math.cos(alpha);

    var a = d * Math.sin(alpha) / Math.sin(delta);

    var y = a * Math.cos(gamma);

    var x = y * Math.tan(gamma);

    var w = bb.w - 2 * x;

    var h = bb.h - 2 * y;

    return image.rotate(degrees).crop(x, y, w, h);
  };

  var crop = function crop(image, value) {

    if (!value.match(/\d*,\d*,\d*,\d*/)) return image;

    var _value$split = value.split(','),
        _value$split2 = (0, _slicedToArray3.default)(_value$split, 4),
        x = _value$split2[0],
        y = _value$split2[1],
        w = _value$split2[2],
        h = _value$split2[3];

    return image.crop(parseInt(x), parseInt(y), parseInt(w), parseInt(h));
  };

  var resize = function resize(image, fit, w, h) {
    var ha = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'center';
    var va = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'middle';
    var dpi = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;


    if (fit === 'contain' && w && h) return image.contain(scaleLength(w, dpi), scaleLength(h, dpi), hmode(ha) | vmode(va));

    if (fit === 'cover' && w && h) return image.cover(scaleLength(w, dpi), scaleLength(h, dpi), hmode(ha) | vmode(va));

    if (h && w) return image.resize(scaleLength(w, dpi), scaleLength(h, dpi));

    if (w) return image.resize(scaleLength(w, dpi), _jimp2.default.AUTO);

    if (h) return image.resize(_jimp2.default.AUTO, scaleLength(h, dpi));

    return image;
  };

  var hmode = function hmode(value) {

    if (value == 'left') return _jimp2.default.HORIZONTAL_ALIGN_LEFT;

    if (value == 'center') return _jimp2.default.HORIZONTAL_ALIGN_CENTER;

    if (value == 'right') return _jimp2.default.HORIZONTAL_ALIGN_RIGHT;
  };

  var vmode = function vmode(value) {

    if (value == 'top') return _jimp2.default.VERTICAL_ALIGN_TOP;

    if (value == 'middle') return _jimp2.default.VERTICAL_ALIGN_MIDDLE;

    if (value == 'bottom') return _jimp2.default.VERTICAL_ALIGN_BOTTOM;
  };

  var scaleLength = function scaleLength(length, dpi) {

    return parseInt(length) * parseFloat(dpi);
  };

  var router = new _express.Router();

  router.get('*', _express2.default.static(options.destination));

  router.get('*', imagecache);

  return router;
};