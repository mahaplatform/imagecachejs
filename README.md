# imagecache.js

Imagecache is a express middleware that lets you manipulate images and then
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

## Brightness
Increase or decrease the brightness
<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-bri-50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?bri=50</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-bri--50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?bri=-50</td></tr>
</table>

## Contrast
Increase or decrease the brightness

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-con-50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?con=50</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-con--50.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?con=-50</td></tr>
</table>

## Flip
Flip the image horizontally, vertically, or both

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-h.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?flip=h</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-v.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?flip=v</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-vh.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?flip=vh</td></tr>
</table>

## Colorize
Colorize image with a preset

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-col-greyscale.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?col=greyscale</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-col-sepia.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?col=sepia</td></tr>
</table>

## Blur
Blur image with a radius

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-blur-15.png" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?blur=15</td></tr>
</table>

## Rotate
Rotate image and then crop to largest possible rectangle with same aspect ratio

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-rot-45.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?rot=45</td></tr>
</table>

## Padding
Put x pixels of padding around the image

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-pad-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?pad=50</td></tr>
</table>

## Border
Draw an x pixel thick border around the image

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-border-50-red.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?border=50,red</td></tr>
</table>

## Hue
Rotate the hue of an image with a value between -360 and 360 degrees

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-hue-90.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?hue=90</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-hue--90.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?hue=-90</td></tr>
</table>

## Saturation
Increase or decrease the saturation of an image with an amount between -100% and 100%

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-sat-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?sat=50</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-sat--50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?sat=-50</td></tr>
</table>

## Tint
Tint the image with a layer of white with a opacity value between 1 and 100

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-tint-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?tint=50</td></tr>
</table>

## Shade
Shade the image with a layer of black with a opacity value between 1 and 100

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-shade-50.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?shade=50</td></tr>
</table>

## Invert
Invert the colors of the image

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-invert.png" height="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?invert=true</td></tr>
</table>

## Crop
Crop the image using a reactangle in the format "x,y,w,h"

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.png" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-crop-100-100-400-200.png" width="200" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.png?crop=100,100,400,200</td></tr>
</table>

## Resize
Resize the image

http://localhost:3000/imagecache/images/kitten.png?w=500

http://localhost:3000/imagecache/images/kitten.png?w=200&dpi=2

http://localhost:3000/imagecache/images/kitten.png?h=250

http://localhost:3000/imagecache/images/kitten.png?w=300&h=300
