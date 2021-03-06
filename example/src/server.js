import express from 'express'
import imagecache from 'imagecachejs'

const app = express()

app.use(express.static('public'))

app.use('/imagecache', imagecache({
  webRoot: 'public',
  sources: [
    'public',
    'http://localhost:8080'
  ]
}))

app.listen(8080, function () {
  console.log('Example app listening on port 8080')
})
