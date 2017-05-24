'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _imagecache = require('imagecache');

var _imagecache2 = _interopRequireDefault(_imagecache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static('public'));

app.use((0, _imagecache2.default)({
  destination: 'cached',
  sources: ['http://localhost:3000']
}));

app.listen(8080, function () {

  console.log('Example app listening on port 8080');
});