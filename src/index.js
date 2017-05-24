
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import express from 'express'
import Promise from 'bluebird'
import request from 'request'
import Jimp from 'jimp'
import { digest } from 'json-hash'

export default (userOptions) => {

  const options = {
    destination: 'cached',
    sources: [],
    ...userOptions
  }

  const imagecache = (req, res, next) => {

    return cache(req.path, req.query).then(path => {

      res.sendFile(path)

    }).catch(err => {

      res.status(404).send(err)

    })

  }

  const cache = (urlpath, query) => {

    return new Promise((resolve, reject) => {

      const hash = digest({ urlpath, query})

      const cachedPath = path.resolve(options.destination, `${hash}.jpg`)

      if(fs.existsSync(cachedPath)) return resolve(cachedPath)

      const parts = urlpath.split('/').slice(2)

      const filepath = path.join(...parts.slice(0, parts.length - 1))

      const filename = parts[parts.length - 1]

      return getUrl(`${filepath}/${filename}`).then(url => {

        return process(url, cachedPath, query)

      }).then(() => {

        return resolve(cachedPath)

      }).catch(err => {

        return reject(err)

      })

    })

  }

  const getUrl = (urlpath) => {

    return new Promise((resolve, reject) => {

      Promise.reduce(options.sources, (found, host) => {

        if(found !== null) return found

        return testUrl(`${host}/${urlpath}`)

      }, null).then(url => {

        if(!url) return reject('Not Found')

        resolve(url)

      })

    })

  }

  const testUrl = (url) => {

    return new Promise((resolve, reject) => {

      request(url, function (error, response, body) {

        if(response && response.statusCode && response.statusCode == 200) {
          return resolve(url)
        }

        resolve(null)

      })

    })

  }

  const process = (url, filepath, params) => {

    return new Promise((resolve, reject) => {

      Jimp.read(url).then(image => {

        return (params.op) ? Promise.reduce(params.op, (image, op) => transform(image, op), image) : transform(image, params)

      }).then(image => {

        return image.write(filepath, () => resolve(filepath))

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

      return (params.con) ? contrast(image, params.con) : image

    }).then(image => {

      return (params.flip) ? flip(image, params.flip) : image

    }).then(image => {

      return (params.col) ? colorize(image, params.col) : image

    }).then(image => {

      return (params.blur) ? blur(image, params.blur) : image

    }).then(image => {

      return (params.rot) ? rotate(image, params.rot) : image

    }).then(image => {

      return (params.crop) ? crop(image, params.crop) : image

    }).then(image => {

      return (params.fit || params.w || params.h) ? resize(image, params.fit, params.w, params.h, params.ha, params.va, params.dpi) : image

    })

  }

  const brightness = (image, value) => {

    if(value < -100 || value > 100) return image

    const delta = parseFloat(value) / 100

    return image.brightness(delta)

  }

  const contrast = (image, value) => {

    if(value < -100 || value > 100) return image

    const delta = parseFloat(value) / 100

    return image.contrast(delta)

  }

  const flip = (image, value) => {

    if(value.match(/^[vh]{1,2}$/) === null) return image

    const horz = value.match(/h/) !== null

    const vert = value.match(/v/) !== null

    return image.flip(horz, vert)

  }

  const colorize = (image, value) => {

    if(value == 'greyscale') {

      return image.greyscale()

    } else if(value == 'sepia') {

      return image.sepia()

    } else {

      return image

    }

  }

  const blur = (image, value) => {

    if(radius < 1 || radius > 100) return image

    const radius = parseInt(value)

    return image.blur(radius)

  }

  const rotate = (image, value) => {

    if(value < 1 || value > 359) return image

    const degrees = parseInt(value)

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

  const crop = (image, value) => {

    if(!value.match(/\d*,\d*,\d*,\d*/)) return image

    const [ x, y, w, h ] = value.split(',')

    return image.crop(parseInt(x), parseInt(y), parseInt(w), parseInt(h))

  }

  const resize = (image, fit, w, h, ha = 'center', va = 'middle', dpi = 1) => {

    if(fit === undefined) {

      if(h && w) {

        return image.resize(scaleLength(w, dpi), scaleLength(h, dpi))

      } else if(w) {

        return image.resize(scaleLength(w, dpi), Jimp.AUTO)

      } else if(h) {

        return image.resize(Jimp.AUTO, scaleLength(h, dpi))

      }

    } else {

      if(fit === 'contain' && w && h) {

        return image.contain(scaleLength(w, dpi), scaleLength(h, dpi), hmode(ha) | vmode(va))

      } else if(fit === 'cover' && w && h) {

        return image.cover(scaleLength(w, dpi), scaleLength(h, dpi), hmode(ha) | vmode(va))

      }

    }

    return image

  }

  const hmode = (value) => {
    if(value == 'left') {
      return Jimp.HORIZONTAL_ALIGN_LEFT
    } else if(value == 'center') {
      return Jimp.HORIZONTAL_ALIGN_CENTER
    } else if(value == 'right') {
      return Jimp.HORIZONTAL_ALIGN_RIGHT
    }
  }

  const vmode = (value) => {
    if(value == 'top') {
      return Jimp.VERTICAL_ALIGN_TOP
    } else if(value == 'middle') {
      return Jimp.VERTICAL_ALIGN_MIDDLE
    } else if(value == 'bottom') {
      return Jimp.VERTICAL_ALIGN_BOTTOM
    }
  }

  const scaleLength = (length, dpi) => {

    return parseInt(length) * parseFloat(dpi)

  }

  const router = new express.Router()

  router.get('/imagecache*', express.static('public/imagecache'))

  router.get('/imagecache*', imagecache)

  return router

}
