'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _jsonHash = require('json-hash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);


              res.status(404).send(_context.t0);

            case 10:
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
      var hash, cachedPath, parts, filepath, filename, url;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              hash = (0, _jsonHash.digest)({ urlpath: urlpath, query: query });
              cachedPath = _path3.default.resolve(options.destination, hash + '.jpg');

              if (!_fs2.default.existsSync(cachedPath)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', cachedPath);

            case 4:
              parts = urlpath.split('/').slice(2);
              filepath = _path3.default.join.apply(_path3.default, (0, _toConsumableArray3.default)(parts.slice(0, parts.length - 1)));
              filename = parts[parts.length - 1];
              _context2.next = 9;
              return getUrl(filepath + '/' + filename);

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

  var getUrl = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(urlpath) {
      var url;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _promise2.default.reduce(options.sources, function (found, host) {

                if (found !== null) return found;

                return testUrl(host + '/' + urlpath);
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
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt('return', new _promise2.default(function (resolve, reject) {

                (0, _request2.default)(url, function (error, response, body) {

                  if (response && response.statusCode && response.statusCode == 200) {
                    return resolve(url);
                  }

                  resolve(null);
                });
              }));

            case 1:
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
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(url, filepath, params) {
      var data, image;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _jimp2.default.read(url);

            case 2:
              data = _context6.sent;

              if (!params.op) {
                _context6.next = 9;
                break;
              }

              _context6.next = 6;
              return _promise2.default.reduce(params.op, function () {
                var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data, op) {
                  return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return transform(data, op);

                        case 2:
                          return _context5.abrupt('return', _context5.sent);

                        case 3:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, undefined);
                }));

                return function (_x11, _x12) {
                  return _ref6.apply(this, arguments);
                };
              }(), data);

            case 6:
              _context6.t0 = _context6.sent;
              _context6.next = 12;
              break;

            case 9:
              _context6.next = 11;
              return transform(data, params);

            case 11:
              _context6.t0 = _context6.sent;

            case 12:
              image = _context6.t0;
              return _context6.abrupt('return', image.write(filepath, function () {
                return resolve(filepath);
              }));

            case 14:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function process(_x8, _x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var transform = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(image, params) {
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!params.bri) {
                _context7.next = 4;
                break;
              }

              _context7.next = 3;
              return brightness(image, params.bri);

            case 3:
              return _context7.abrupt('return', _context7.sent);

            case 4:
              if (!params.con) {
                _context7.next = 8;
                break;
              }

              _context7.next = 7;
              return contrast(image, params.con);

            case 7:
              return _context7.abrupt('return', _context7.sent);

            case 8:
              if (!params.flip) {
                _context7.next = 12;
                break;
              }

              _context7.next = 11;
              return flip(image, params.flip);

            case 11:
              return _context7.abrupt('return', _context7.sent);

            case 12:
              if (!params.col) {
                _context7.next = 16;
                break;
              }

              _context7.next = 15;
              return colorize(image, params.col);

            case 15:
              return _context7.abrupt('return', _context7.sent);

            case 16:
              if (!params.blur) {
                _context7.next = 20;
                break;
              }

              _context7.next = 19;
              return blur(image, params.blur);

            case 19:
              return _context7.abrupt('return', _context7.sent);

            case 20:
              if (!params.rot) {
                _context7.next = 24;
                break;
              }

              _context7.next = 23;
              return rotate(image, params.rot);

            case 23:
              return _context7.abrupt('return', _context7.sent);

            case 24:
              if (!params.crop) {
                _context7.next = 28;
                break;
              }

              _context7.next = 27;
              return crop(image, params.crop);

            case 27:
              return _context7.abrupt('return', _context7.sent);

            case 28:
              if (!(params.fit || params.w || params.h)) {
                _context7.next = 32;
                break;
              }

              _context7.next = 31;
              return resize(image, params.fit, params.w, params.h, params.ha, params.va, params.dpi);

            case 31:
              return _context7.abrupt('return', _context7.sent);

            case 32:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function transform(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

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

    if (value == 'greyscale') {

      return image.greyscale();
    } else if (value == 'sepia') {

      return image.sepia();
    } else {

      return image;
    }
  };

  var blur = function blur(image, value) {

    if (radius < 1 || radius > 100) return image;

    var radius = parseInt(value);

    return image.blur(radius);
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


    if (fit === undefined) {

      if (h && w) {

        return image.resize(scaleLength(w, dpi), scaleLength(h, dpi));
      } else if (w) {

        return image.resize(scaleLength(w, dpi), _jimp2.default.AUTO);
      } else if (h) {

        return image.resize(_jimp2.default.AUTO, scaleLength(h, dpi));
      }
    } else {

      if (fit === 'contain' && w && h) {

        return image.contain(scaleLength(w, dpi), scaleLength(h, dpi), hmode(ha) | vmode(va));
      } else if (fit === 'cover' && w && h) {

        return image.cover(scaleLength(w, dpi), scaleLength(h, dpi), hmode(ha) | vmode(va));
      }
    }

    return image;
  };

  var hmode = function hmode(value) {
    if (value == 'left') {
      return _jimp2.default.HORIZONTAL_ALIGN_LEFT;
    } else if (value == 'center') {
      return _jimp2.default.HORIZONTAL_ALIGN_CENTER;
    } else if (value == 'right') {
      return _jimp2.default.HORIZONTAL_ALIGN_RIGHT;
    }
  };

  var vmode = function vmode(value) {
    if (value == 'top') {
      return _jimp2.default.VERTICAL_ALIGN_TOP;
    } else if (value == 'middle') {
      return _jimp2.default.VERTICAL_ALIGN_MIDDLE;
    } else if (value == 'bottom') {
      return _jimp2.default.VERTICAL_ALIGN_BOTTOM;
    }
  };

  var scaleLength = function scaleLength(length, dpi) {

    return parseInt(length) * parseFloat(dpi);
  };

  var router = new _express2.default.Router();

  router.get('/imagecache*', _express2.default.static('public/imagecache'));

  router.get('/imagecache*', imagecache);

  return router;
};