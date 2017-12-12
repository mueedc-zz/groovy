const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const { User } = require('../db/models')
module.exports = router

if (!process.env.client_id || !process.env.client_secret) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')
} else {
  const spotifyConfig = {
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
    callbackURL: process.env.callback_uri
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (token, refreshToken, user, done) => {
      User.findOrCreate({
        where: {
          spotifyId: user.id,
          email: user._json.email,
          token: token
        }
      })
        .then(user => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('spotify', {
      scope: [
        'user-read-email',
        'user-read-recently-played',
        'user-read-private'
      ]
    })
  )

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
