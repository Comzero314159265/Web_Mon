process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const express = require('./config/express')
const config = require('./config/env/config')
const app = express()
const http = require('http').Server(app)

const {
  sequelize
} = require('./app/models')

sequelize.sync()
  .then(() => {
    require('./app/helper/socket')(http)
    http.listen(config.port, () => console.log('Server running at http://localhost:' + config.port))
  })

module.exports = app
