
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import express from 'express'
import { Router } from 'express'
import Request from 'request'
import Jimp from 'jimp'
import URL from 'url'
import tinycolor from 'tinycolor2'
import qs from 'qs'
import url from 'url'
import { digest } from 'json-hash'

const request = Promise.promisify(Request)

export default (userOptions) => {

  const options = {
    destination: path.resolve('cached'),
    sources: [],
    ...userOptions
  }

  const imagecache = async (req, res, next) => {

    try {

      const [ assetPath, query ] = extractPathAndQuery(req)

      const cachedPath = await cache(assetPath, query)

      if(!cachedPath) return next()

      res.sendFile(cachedPath)

    } catch(err) {

      next(err)

    }

  }

  const extractPathAndQuery = (req) => {

    const uri = url.parse(req.originalUrl)

    const pathPrefix = uri.pathname.replace(req.path, '')

    const pathname = uri.pathname.replace(pathPrefix, '')

    const firstFolder = pathname.split('/')[1]

    const matches = firstFolder.match(/\w*\=\w*/)

    const query = matches ? qs.parse(firstFolder) : req.query

    const assetPath = matches ? pathname.replace(`/${firstFolder}`, '') : pathname

    return [ assetPath, query ]

  }

  const cache = async (assetPath, query) => {

    const pathParts = assetPath.split('/')

    const filename = pathParts[pathParts.length - 1]

    const fileExt = filename.split('.').pop()

    const format = query.fm || fileExt

    const ext = getFormat(format)

    const cachedPath = path.resolve(options.destination, qs.stringify(query), ...pathParts).replace(`.${fileExt}`,`.${format}`)

    if(fs.existsSync(cachedPath)) return cachedPath

    const originalPath = path.resolve(options.destination, 'originals', ...pathParts)

    const originalExists = fs.existsSync(originalPath)

    const noQuery = _.isEmpty(query)

    if(originalExists && noQuery) return originalPath

    const imagePath = (originalExists) ? originalPath : await getUrl(assetPath)

    if(!imagePath) return null

    const destinationPath = (noQuery) ? originalPath : cachedPath

    await process(imagePath, destinationPath, query)

    return destinationPath

  }

  const getFormat = (format) => {

    if(format === 'png') return 'png'

    if(format === 'bmp') return 'bmp'

    return 'jpg'

  }

  const getUrl = async (urlpath) => {

    const url = await Promise.reduce(options.sources, (found, host) => {

      if(found !== null) return found

      return testUrl(host + urlpath)

    }, null)

    return url

  }

  const testUrl = async (url) => {

    const response = await request(url)

    if(response && response.statusCode && response.statusCode == 200) return url

    return null

  }

  const process = async (path, filepath, params) => {

    const data = await Jimp.read(path)

    const image = (params.op) ? await Promise.reduce(params.op, (data, op) => transform(data, op), data) : await transform(data, params)

    await new Promise((resolve, reject) => image.write(filepath, () => resolve()))

  }

  const transform = (image, params) => {

    if(params.bri) image = brightness(image, params.bri)

    if(params.con) image = contrast(image, params.con)

    if(params.flip) image = flip(image, params.flip)

    if(params.blur) image = blur(image, params.blur)

    if(params.pad) image = padding(image, params.pad)

    if(params.bg) image = background(image, params.bg)

    if(params.border) image = border(image, params.border)

    if(params.hue) image = hue(image, params.hue)

    if(params.sat) image = saturation(image, params.sat)

    if(params.tint) image = tint(image, params.tint)

    if(params.invert) image = invert(image, params.invert)

    if(params.rot) image = rotate(image, params.rot)

    if(params.fit || params.w || params.h) image = resize(image, params.fit, params.w, params.h, params.ha, params.va, params.dpi)

    if(params.crop) image = crop(image, params.crop)

    return image

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

  const blur = (image, value) => {

    const radius = parseInt(value)

    if(radius < 1 || radius > 100) return image

    return image.blur(radius)

  }

  const padding = (image, value) => {

    const padding = parseInt(value)

    if(padding < 1) return image

    const img = new Jimp(image.bitmap.width + (padding * 2), image.bitmap.height + (padding * 2), 0x00000000)

    return img.composite(image, padding, padding)

  }

  const background = (image, value) => {

    const color = tinycolor(value)

    if(!color.isValid()) return image

    const hex = parseInt(color.toHex8(), 16)

    const img = new Jimp(image.bitmap.width, image.bitmap.height, hex)

    return img.composite(image, 0, 0)

  }

  const border = (image, value) => {

    const matches = value.match(/(\d*),(\w*)/)

    if(!matches) return image

    const [,borderValue,hexValue] = matches

    const color = tinycolor(hexValue)

    const border = parseInt(borderValue)

    if(!color.isValid()) return image

    const hex = parseInt(color.toHex8(), 16)

    const verticalBorder = new Jimp(border, image.bitmap.height, hex)

    const horizontalBorder = new Jimp(image.bitmap.width - (border * 2), border, hex)

    return image.composite(verticalBorder, 0, 0)
                .composite(verticalBorder, (image.bitmap.width - border), 0)
                .composite(horizontalBorder, border, 0)
                .composite(horizontalBorder, border, (image.bitmap.height - border))

  }

  const hue = (image, value) => {

    const degrees = parseInt(value)

    if(degrees === 0 || degrees < -360 || degrees > 360) return image

    return image.color([ { apply: 'hue', params: [ degrees ] } ])

  }

  const saturation = (image, value) => {

    const amount = parseInt(value)

    if(amount === 0 || amount < -100 || amount > 100) return image

    if(amount < 0) return image.color([ { apply: 'desaturate', params: [ Math.abs(amount) ] } ])

    if(amount > 0) return image.color([ { apply: 'saturate', params: [ amount ] } ])

  }

  const tint = (image, value) => {

    const matches = value.match(/(\w*),(\d*)/)

    if(!matches) return image

    const [,hexValue,mixValue] = matches

    if(mixValue < 1 || mixValue > 100) return image

    const alpha = (parseInt(mixValue * 2.56) - 1).toString(16)

    const hex8 = parseInt(tinycolor(tinycolor(hexValue).toHexString() + alpha).toHex8(), 16)

    const veil = new Jimp(image.bitmap.width, image.bitmap.height, hex8)

    return image.composite(veil, 0, 0)

  }

  const invert = (image, value) => {

    if(value !== 'true') return image

    return image.invert()

  }

  const rotate = (image, value) => {

    if(value < 1 || value > 359) return image

    const degrees = parseInt(value)

    const ow = image.bitmap.width

    const oh = image.bitmap.height

    const angle = degrees * (Math.PI / 180)

    const quadrant = Math.floor(angle / (Math.PI / 2)) & 3

    const sign_alpha = (quadrant & 1) === 0 ? angle : Math.PI - angle

    const alpha = (sign_alpha % Math.PI + Math.PI) % Math.PI

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

    if(fit === 'contain' && w && h) return image.contain(scaleLength(w, dpi), scaleLength(h, dpi), hmode(ha) | vmode(va))

    if(fit === 'cover' && w && h) return image.cover(scaleLength(w, dpi), scaleLength(h, dpi), hmode(ha) | vmode(va))

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

  router.use(express.static(options.destination))

  router.get('*', imagecache)

  return router

}
