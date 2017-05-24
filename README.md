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
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.jpg" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-bri-50.jpg" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.jpg?bri=50</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.jpg" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-bri-30.jpg" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.jpg?bri=-30</td></tr>
</table>

## Contrast
Increase or decrease the brightness

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.jpg" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-con-50.jpg" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.jpg?con=50</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.jpg" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-con-30.jpg" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.jpg?con=-30</td></tr>
</table>

## Flip
Flip the image horizontally, vertically, or both

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.jpg" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-h.jpg" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.jpg?flip=h</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.jpg" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-v.jpg" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.jpg?flip=v</td></tr>
</table>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten.jpg" width="300" /></td>
    <td><img src="https://raw.githubusercontent.com/mahaplatform/imagecachejs/master/docs/kitten-flip-vh.jpg" width="300" /></td>
  </tr>
  <tr><td colspan="2">http://localhost:3000/imagecache/images/kitten.jpg?flip=vh</td></tr>
</table>

## Colorize
Colorize image with a preset

http://localhost:3000/imagecache/images/kitten.jpg?col=greyscale
http://localhost:3000/imagecache/images/kitten.jpg?col=sepia

## Blur
Blur image with a radius

http://localhost:3000/imagecache/images/kitten.jpg?blur=15

## Rotate
Rotate image and then crop to largest possible rectangle with same aspect ratio

http://localhost:3000/imagecache/images/kitten.jpg?rot=45

## Crop
Crop the image using a reactangle in the format "x,y,w,h"

http://localhost:3000/imagecache/images/kitten.jpg?crop=100,100,560,400


## Resize
Resize the image

http://localhost:3000/imagecache/images/kitten.jpg?w=500
http://localhost:3000/imagecache/images/kitten.jpg?w=200&dpi=2
http://localhost:3000/imagecache/images/kitten.jpg?h=250
http://localhost:3000/imagecache/images/kitten.jpg?w=300&h=300
