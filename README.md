# Imagecache
<a href="https://circleci.com/gh/mahaplatform/imagecachejs">
  <img src="https://img.shields.io/circleci/project/mahaplatform/imagecachejs.svg?maxAge=600" alt="Build Status" >
</a>
<a href="https://codeclimate.com/github/mahaplatform/imagecachejs">
  <img src="https://img.shields.io/codeclimate/github/mahaplatform/imagecachejs.svg?maxAge=600" alt="Code Climate" />
</a>
<a href="https://codeclimate.com/github/mahaplatform/imagecachejs/coverage">
  <img src="https://img.shields.io/codeclimate/coverage/github/mahaplatform/imagecachejs.svg?maxAge=600" alt="Code Coverage" />
</a>

Imagecache is an express middleware that lets you manipulate images and then
cache them for quick retrieval.

## Installation
Install with [npm](http://npmjs.com) or [yarn](https://yarnpkg.com):

```sh
npm install --save imagecachejs
```

## Usage
It's easy to just add imagecache to your application

```JavaScript
import express from 'express'
import imagecache from 'imagecachejs'

const app = express()

app.use(express.static('./public'))

app.use('/imagecache', imagecache({
  webRoot: 'public',
  sources: [
    'public',
    'http://localhost:8080'
  ]
}))

app.listen(8080, function () {
  console.log('Example app listening on port 8080')
})
```

## Generating an Image
Once your server is up and running, you can invoke an image transformation using
the following syntax:

```sh
# http://{hostname}/{mountPoint}/{transformationString}/{imagePath}
http://example.com/imagecache/bri=50&sat=30/images/kitten.png
```

By putting all of the image transformations in the url file path rather than a
query string, the transformed file can easily be saved to filesystem and
served as a static asset from static middleware (express.static), a web server
(nginx, Apache), a content delivery network (Amazon CloudFront, Akamai), or a caching
web proxy (Varnish, Squid).

## Transformation Strings
Image transformations are invoked using a 'query string like' syntax. For
example, if you want to brighten an image, decrease the contrast, and resize
the image to a width of 250 pixels, the transformation string would be:

```sh
bri=15&con=-10&w=250
```

These transformations, however, will not necessarily be executed in the order
given. If the sequence is important to you, use the `op` argument:

```sh
op[0][bri]=15&op[1][con]=-10&op[2][w]=250
```

## Transformations
The following transformations are available through Imagecache:

* <a href="#brightness">Brightness (bri)</a>
* <a href="#contrast">Contrast (con)</a>
* <a href="#hue">Hue (hue)</a>
* <a href="#saturation">Saturation (sat)</a>
* <a href="#tint">Tint (tint)</a>
* <a href="#invert">Invert (invert)</a>
* <a href="#blur">Blur (blur)</a>
* <a href="#flip">Flip (flip)</a>
* <a href="#rotate">Rotate (rot)</a>
* <a href="#padding">Padding (pad)</a>
* <a href="#border">Border (border)</a>
* <a href="#crop">Crop (crop)</a>
* <a href="#resize">Resize (fit,w,h)</a>

### Brightness
Increase or decrease the brightness of an image
<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-bri-50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/bri=50/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-bri--50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/bri=-50/images/kitten.png</td></tr>
</table>

### Contrast
Increase or decrease the contrast of an image

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-con-50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/con=50/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-con--50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/con=-50/images/kitten.png</td></tr>
</table>

### Hue
Rotate the hue of an image with a value between -360 and 360 degrees

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-hue-90.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/hue=90/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-hue--90.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/hue=-90/images/kitten.png</td></tr>
</table>

### Saturation
Increase or decrease the saturation of an image with an amount between -100% and 100%

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-sat-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/sat=50/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-sat--50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/sat=-50/images/kitten.png</td></tr>
</table>

### Tint
Tint an image with a layer of any color with a opacity value between 1% and 100%

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-tint-red-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/tint=red,50/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-tint-blue-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/tint=blue,50/images/kitten.png</td></tr>
</table>

### Invert
Invert the colors of the image

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-invert.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/invert=true/images/kitten.png</td></tr>
</table>

### Blur
Blur image with a radius

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-blur-15.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/blur=15/images/kitten.png</td></tr>
</table>

### Flip
Flip the image horizontally, vertically, or both

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-h.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/flip=h/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-v.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/flip=v/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-vh.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/flip=vh/images/kitten.png</td></tr>
</table>

### Rotate
Rotate image and then crop to largest possible rectangle with same aspect ratio

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-rot-45.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/rot=45/images/kitten.png</td></tr>
</table>

### Padding
Put x pixels of padding around the image

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-pad-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/pad=50/images/kitten.png</td></tr>
</table>

### Border
Draw an x pixel thick border around the image

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-border-50-red.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/border=50,red/images/kitten.png</td></tr>
</table>

### Crop
Crop the image using a reactangle in the format "x,y,w,h"

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-crop-100-100-400-200.png" width="200" /></td>
  </tr>
  <tr><td colspan="2">http://example.com/imagecache/crop=100,100,400,200/images/kitten.png</td></tr>
</table>

### Resize
Resize the image

<table>
  <tr><td colspan="2">http://example.com/imagecache/w=500/images/kitten.png</td></tr>
</table>

<table>
  <tr><td colspan="2">http://example.com/imagecache/w=200&dpi=2/images/kitten.png</td></tr>
</table>

<table>
  <tr><td colspan="2">http://example.com/imagecache/h=250/images/kitten.png</td></tr>
</table>

<table>
  <tr><td colspan="2">http://example.com/imagecache/w=300&h=300/images/kitten.png</td></tr>
</table>

## Author & Credits

Imagecache was originally written by [Greg Kops](https://github.com/mochini) and
is based upon his work with [Think Topography](http://thinktopography.com) and
[The Cornell Cooperative Extension of Tompkins County](http://ccetompkins.org).

Special thanks to [Oliver Moran](https://github.com/oliver-moran) and the [Jimp](https://github.com/oliver-moran/jimp)
project for building the engine that makes Imagecache possible!
