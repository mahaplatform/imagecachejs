import express from 'express'
import imagecache from 'imagecache'

const app = express()

app.use(express.static('public'))

app.use(imagecache({
  destination: 'cached',
  sources: [
    'http://localhost:3000'
  ]
}))

app.listen(8080, function () {

  console.log('Example app listening on port 8080')

})
