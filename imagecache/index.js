
import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import Jimp from 'jimp'
import { digest } from 'json-hash'

export default (req, res, next) => {

  const hash = digest({ path: req.path, query: req.query })

  const cachedPath = path.resolve('public','imagecache',`${hash}.jpg`)

  if(fs.existsSync(cachedPath)) {
    return res.sendFile(cachedPath)
  }

  const parts = req.path.split('/').slice(2)

  const filepath = path.join(...parts.slice(0, parts.length - 1))

  const filename = parts[parts.length - 1]

  const url = `http://localhost:3000/${filepath}/${filename}`

  return process(url, cachedPath, req.query).then(() => {

    res.sendFile(cachedPath)

  }).catch(err => {

    res.json({ err })

  })

}

const process = (url, filepath, params) => {

  return new Promise((resolve, reject) => {

    Jimp.read(url).then(image => {

      return (params.op) ? Promise.reduce(params.op, (image, op) => transform(image, op), image) : transform(image, params)

    }).then(image => {

      return image.write(filepath, () => resolve())

    }).catch(err => {

      console.log(err)

      reject()

    })

  })

}

const transform = (image, params) => {

  return Promise.resolve(image).then(image => {

    return (params.bri) ? brightness(image, params.bri) : image

  }).then(image => {

    return (params.con) ? brightness(image, params.con) : image

  }).then(image => {

    return (params.flip) ? flip(image, params.con) : image

  }).then(image => {

    return (params.col) ? colorize(image, params.col) : image

  }).then(image => {

    return (params.blur) ? blur(image, params.blur) : image

  }).then(image => {

    return (params.rot) ? rotate(image, params.rot) : image

  }).then(image => {

    return (params.crop) ? crop(image, params.crop) : image

  }).then(image => {

    return (params.fit || params.w || params.h) ? resize(image, params.fit, params.w, params.h, params.dpi) : image

  })

}

const brightness = (image, bri) => {

  return image.brightness(parseFloat(bri) / 100)

}

const contrast = (image, con) => {

  return image.contrast(parseFloat(con) / 100)

}

const flip = (image, flip) => {

  const horz = flip.match(/h/) !== null

  const vert = flip.match(/v/) !== null

  return image.flip(horz, vert)

}

const colorize = (image, effect) => {

  if(effect == 'greyscale') {
    return image.greyscale()
  } else if(effect == 'sepia') {
    return image.sepia()
  } else {
    return image
  }

}

const blur = (image, blur) => {

  return image.blur(parseInt(blur))

}

const rotate = (image, rot) => {

  const degrees = parseInt(rot)

  const ow = image.bitmap.width

  const oh = image.bitmap.height

  const angle = degrees * (Math.PI / 180)

  const quadrant = Math.floor(angle / (Math.PI / 2)) & 3

  const sign_alpha = (quadrant & 1) === 0 ? angle : Math.PI - angle

  const alpha = (sign_alpha % Math.PI + Math.PI) % Math.PI;

  const bb = {
    w: ow * Math.cos(alpha) + oh * Math.sin(alpha),
    h: ow * Math.sin(alpha) + oh * Math.cos(alpha)
  }


  const gamma = ow < oh ? Math.atan2(bb.w, bb.h) : Math.atan2(bb.h, bb.w)

  const delta = Math.PI - alpha - gamma

  const length = ow < oh ? oh : ow

  const d = length * Math.cos(alpha)

  const a = d * Math.sin(alpha) / Math.sin(delta)

  const y = a * Math.cos(gamma)

  const x = y * Math.tan(gamma)

  const w = bb.w - 2 * x

  const h = bb.h - 2 * y

  return image.rotate(degrees).crop(x, y, w, h)

}

const crop = (image, crop) => {

  if(!crop.match(/\d*,\d*,\d*,\d*/)) {
    return image
  }

  const [ x, y, w, h ] = crop.split(',')

  return image.crop(parseInt(x), parseInt(y), parseInt(w), parseInt(h))

}

const resize = (image, fit, w, h, dpi = 1) => {

  if(fit && w && h) {

    if(fit == 'contain') {

      return image.contain(scaleLength(w, dpi), scaleLength(h, dpi))

    } else if(fit == 'cover') {

      return image.cover(scaleLength(w, dpi), scaleLength(h, dpi))

    }

  } else if(w && !h) {

    return image.resize(scaleLength(w, dpi), Jimp.AUTO)

  } else if(h && !w) {

    return image.resize(Jimp.AUTO, scaleLength(h, dpi))

  } else if(h && w) {

    return image.resize(scaleLength(w, dpi), scaleLength(h, dpi))

  }

}

const scaleLength = (length, dpi) => {
  return parseInt(length) * parseFloat(dpi)
}
