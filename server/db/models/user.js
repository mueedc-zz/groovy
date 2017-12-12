const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: Sequelize.STRING,
  spotifyId: Sequelize.STRING,
  token: Sequelize.TEXT
})

module.exports = User
