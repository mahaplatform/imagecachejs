'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

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

  var imagecache = function imagecache(req, res, next) {

    return cache(req.path, req.query).then(function (path) {

      res.sendFile(path);
    }).catch(function (err) {

      res.status(404).send(err);
    });
  };

  var cache = function cache(urlpath, query) {

    return new _bluebird2.default(function (resolve, reject) {

      var hash = (0, _jsonHash.digest)({ urlpath: urlpath, query: query });

      var cachedPath = _path2.default.resolve(options.destination, hash + '.jpg');

      if (_fs2.default.existsSync(cachedPath)) return resolve(cachedPath);

      var parts = urlpath.split('/').slice(2);

      var filepath = _path2.default.join.apply(_path2.default, (0, _toConsumableArray3.default)(parts.slice(0, parts.length - 1)));

      var filename = parts[parts.length - 1];

      return getUrl(filepath + '/' + filename).then(function (url) {

        return process(url, cachedPath, query);
      }).then(function () {

        return resolve(cachedPath);
      }).catch(function (err) {

        return reject(err);
      });
    });
  };

  var getUrl = function getUrl(urlpath) {

    return new _bluebird2.default(function (resolve, reject) {

      _bluebird2.default.reduce(options.sources, function (found, host) {

        if (found !== null) return found;

        return testUrl(host + '/' + urlpath);
      }, null).then(function (url) {

        if (!url) return reject('Not Found');

        resolve(url);
      });
    });
  };

  var testUrl = function testUrl(url) {

    return new _bluebird2.default(function (resolve, reject) {

      (0, _request2.default)(url, function (error, response, body) {

        if (response && response.statusCode && response.statusCode == 200) {
          return resolve(url);
        }

        resolve(null);
      });
    });
  };

  var process = function process(url, filepath, params) {

    return new _bluebird2.default(function (resolve, reject) {

      _jimp2.default.read(url).then(function (image) {

        return params.op ? _bluebird2.default.reduce(params.op, function (image, op) {
          return transform(image, op);
        }, image) : transform(image, params);
      }).then(function (image) {

        return image.write(filepath, function () {
          return resolve(filepath);
        });
      }).catch(function (err) {

        console.log(err);

        reject();
      });
    });
  };

  var transform = function transform(image, params) {

    return _bluebird2.default.resolve(image).then(function (image) {

      return params.bri ? brightness(image, params.bri) : image;
    }).then(function (image) {

      return params.con ? contrast(image, params.con) : image;
    }).then(function (image) {

      return params.flip ? flip(image, params.flip) : image;
    }).then(function (image) {

      return params.col ? colorize(image, params.col) : image;
    }).then(function (image) {

      return params.blur ? blur(image, params.blur) : image;
    }).then(function (image) {

      return params.rot ? rotate(image, params.rot) : image;
    }).then(function (image) {

      return params.crop ? crop(image, params.crop) : image;
    }).then(function (image) {

      return params.fit || params.w || params.h ? resize(image, params.fit, params.w, params.h, params.ha, params.va, params.dpi) : image;
    });
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