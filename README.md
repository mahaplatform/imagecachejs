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
<img src="https://raw.githubusercontent.com/mahaplatform/maha-platform/master/docs/kitten-bri-50.jpg" />
http://localhost:3000/imagecache/images/apartment.jpg?bri=50
http://localhost:3000/imagecache/images/apartment.jpg?bri=-30

## Contrast
Increase or decrease the brightness

http://localhost:3000/imagecache/images/apartment.jpg?con=50
http://localhost:3000/imagecache/images/apartment.jpg?con=-30

## Flip
Flip the image horizontally, vertically, or both

http://localhost:3000/imagecache/images/apartment.jpg?flip=h
http://localhost:3000/imagecache/images/apartment.jpg?flip=v
http://localhost:3000/imagecache/images/apartment.jpg?flip=vh

## Colorize
Colorize image with a preset

http://localhost:3000/imagecache/images/apartment.jpg?col=greyscale
http://localhost:3000/imagecache/images/apartment.jpg?col=sepia

## Blur
Blur image with a radius

http://localhost:3000/imagecache/images/apartment.jpg?blur=15

## Rotate
Rotate image and then crop to largest possible rectangle with same aspect ratio

http://localhost:3000/imagecache/images/apartment.jpg?rot=45

## Crop
Crop the image using a reactangle in the format "x,y,w,h"

http://localhost:3000/imagecache/images/apartment.jpg?crop=100,100,560,400


## Resize
Resize the image

http://localhost:3000/imagecache/images/apartment.jpg?w=500
http://localhost:3000/imagecache/images/apartment.jpg?w=200&dpi=2
http://localhost:3000/imagecache/images/apartment.jpg?h=250
http://localhost:3000/imagecache/images/apartment.jpg?w=300&h=300
