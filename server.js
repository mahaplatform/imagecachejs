import express from 'express'
import imagecache from './imagecache'

const app = express()

app.use(express.static('public'))

app.get('/imagecache*', imagecache)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
