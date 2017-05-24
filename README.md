# imagecachejs

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
import path from 'path'
import express from 'express'
import imagecache from 'imagecachejs'

const app = express()

app.use(express.static('./public'))

app.use('/imagecache', imagecache({
  destination: path.resolve('cached'),
  sources: [
    'http://localhost:8080'
  ]
}))

app.listen(8080, function () {
  console.log('Example app listening on port 8080')
})
```

## Generating an Image
Once your server is up and running, you can invoke an image transformation using
one of the following two syntaxes:

```sh
# query string syntax
http://localhost:3000/imagecache/{imagePath}?{queryString}

# pathname syntax
http://localhost:3000/imagecache/{queryString}/{imagePath}
```

The pathname syntax is usually preferable because it is something that a CDN or
caching proxy can easily request and save using the full pathname as the cache
key

## [BRI] Brightness
Increase or decrease the brightness
<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-bri-50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/bri=50/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-bri--50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/bri=-50/images/kitten.png</td></tr>
</table>

## [CON] Contrast
Increase or decrease the brightness

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-con-50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/con=50/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-con--50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/con=-50/images/kitten.png</td></tr>
</table>

## [FLIP] Flip
Flip the image horizontally, vertically, or both

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-h.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/flip=h/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-v.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/flip=v/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-vh.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/flip=vh/images/kitten.png</td></tr>
</table>

## [COL] Colorize
Colorize image with a preset

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-col-greyscale.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/col=greyscale/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-col-sepia.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/col=sepia/images/kitten.png</td></tr>
</table>

## [BLUR] Blur
Blur image with a radius

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-blur-15.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/blur=15/images/kitten.png</td></tr>
</table>

## [ROT] Rotate
Rotate image and then crop to largest possible rectangle with same aspect ratio

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-rot-45.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/rot=45/images/kitten.png</td></tr>
</table>

## [PAD] Padding
Put x pixels of padding around the image

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-pad-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/pad=50/images/kitten.png</td></tr>
</table>

## [BORDER] Border
Draw an x pixel thick border around the image

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-border-50-red.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/border=50,red/images/kitten.png</td></tr>
</table>

## [HUE] Hue
Rotate the hue of an image with a value between -360 and 360 degrees

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-hue-90.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/hue=90/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-hue--90.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/hue=-90/images/kitten.png</td></tr>
</table>

## [SAT] Saturation
Increase or decrease the saturation of an image with an amount between -100% and 100%

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-sat-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/sat=50/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-sat--50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/sat=-50/images/kitten.png</td></tr>
</table>

## [TINT] Tint
Tint the image with a layer of white with a opacity value between 1 and 100

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-tint-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/tint=50/images/kitten.png</td></tr>
</table>

## [SHADE] Shade
Shade the image with a layer of black with a opacity value between 1 and 100

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-shade-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/shade=50/images/kitten.png</td></tr>
</table>


## [MIX] Mix
Tint the image with a layer of any color with a opacity value between 1 and 100

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-mix-red-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/mix=red,50/images/kitten.png</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-mix-blue-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/mix=blue,50/images/kitten.png</td></tr>
</table>

## [INVERT] Invert
Invert the colors of the image

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-invert.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/invert=true/images/kitten.png</td></tr>
</table>

## [CROP] Crop
Crop the image using a reactangle in the format "x,y,w,h"

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-crop-100-100-400-200.png" width="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/crop=100,100,400,200/images/kitten.png</td></tr>
</table>

## [FIT,W,H,HA,VA] Resize
Resize the image

http://localhost:3000/imagecache/w=500/images/kitten.png

http://localhost:3000/imagecache/w=200&dpi=2/images/kitten.png

http://localhost:3000/imagecache/h=250/images/kitten.png

http://localhost:3000/imagecache/w=300&h=300/images/kitten.png
