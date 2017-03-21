import express from 'express'
import path from 'path'
import imagecache from './imagecache'

const app = express()

app.use(express.static('public'))

app.use(imagecache({
  destination: path.resolve(__dirname, 'cached'),
  sources: ['http://localhost:3000']
}))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
