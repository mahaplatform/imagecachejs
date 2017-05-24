
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { Router } from 'express'
import request from 'request'
import Jimp from 'jimp'
import { digest } from 'json-hash'

export default (userOptions) => {

  const options = {
    destination: 'cached',
    sources: [],
    ...userOptions
  }

  const imagecache = async (req, res, next) => {

    try {

      const path = await cache(req.path, req.query)

      res.sendFile(path)

    } catch(err) {

      res.status(404).send(err)

    }

  }

  const cache = async (urlpath, query) => {

    const hash = digest({ urlpath, query })

    const cachedPath = path.resolve(options.destination, `${hash}.jpg`)

    if(fs.existsSync(cachedPath)) return cachedPath

    const parts = urlpath.split('/').slice(2)

    const filepath = path.join(...parts.slice(0, parts.length - 1))

    const filename = parts[parts.length - 1]

    const url = await getUrl(`${filepath}/${filename}`)

    await process(url, cachedPath, query)

    return cachedPath

  }

  const getUrl = async (urlpath) => {

    const url = await Promise.reduce(options.sources, (found, host) => {

      if(found !== null) return found

      return testUrl(`${host}/${urlpath}`)

    }, null)

    if(!url) throw new Error('Not Found')

    return url

  }

  const testUrl = async (url) => {

    return new Promise((resolve, reject) => {

      request(url, function (error, response, body) {

        if(response && response.statusCode && response.statusCode == 200) {
          return resolve(url)
        }

        resolve(null)

      })

    })

  }

  const process = async (url, filepath, params) => {

    const data = await Jimp.read(url)

    const image = (params.op) ? await Promise.reduce(params.op, async (data, op) => await transform(data, op), data) : await transform(data, params)

    return image.write(filepath, () => resolve(filepath))

  }

  const transform = async (image, params) => {

    if(params.bri) return await brightness(image, params.bri)

    if(params.con) return await contrast(image, params.con)

    if(params.flip) return await flip(image, params.flip)

    if(params.col) return await colorize(image, params.col)

    if(params.blur) return await blur(image, params.blur)

    if(params.rot) return await rotate(image, params.rot)

    if(params.crop) return await crop(image, params.crop)

    if(params.fit || params.w || params.h) return await resize(image, params.fit, params.w, params.h, params.ha, params.va, params.dpi)

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

    if(value == 'greyscale') return image.greyscale()

    if(value == 'sepia') return image.sepia()

    return image

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

    if(fit === 'contain' && w && h) {

      return image.contain(scaleLength(w, dpi), scaleLength(h, dpi), hmode(ha) | vmode(va))

    }

    if(fit === 'cover' && w && h) {

      return image.cover(scaleLength(w, dpi), scaleLength(h, dpi), hmode(ha) | vmode(va))

    }

    if(h && w) return image.resize(scaleLength(w, dpi), scaleLength(h, dpi))

    if(w) return image.resize(scaleLength(w, dpi), Jimp.AUTO)

    if(h) return image.resize(Jimp.AUTO, scaleLength(h, dpi))

    return image

  }

  const hmode = (value) => {

    if(value == 'left')  return Jimp.HORIZONTAL_ALIGN_LEFT

    if(value == 'center') return Jimp.HORIZONTAL_ALIGN_CENTER

    if(value == 'right') return Jimp.HORIZONTAL_ALIGN_RIGHT

  }

  const vmode = (value) => {

    if(value == 'top') return Jimp.VERTICAL_ALIGN_TOP

    if(value == 'middle') return Jimp.VERTICAL_ALIGN_MIDDLE

    if(value == 'bottom') return Jimp.VERTICAL_ALIGN_BOTTOM

  }

  const scaleLength = (length, dpi) => {

    return parseInt(length) * parseFloat(dpi)

  }

  const router = new Router()

  router.get('/imagecache*', express.static('public/imagecache'))

  router.get('/imagecache*', imagecache)

  return router

}
