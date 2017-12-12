const router = require('express').Router()
const getLyrics = require('lyric-get').get
module.exports = router

router.use('/spotify', require('./spotify'))

router.use('/lyrics/:artist/:song', (req, res, next) => {
  getLyrics(req.params.artist, req.params.song, (err, lyric) => {
    err ? next(err) : res.send({ lyric })
  })
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
