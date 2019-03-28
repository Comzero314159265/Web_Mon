process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const express = require('./config/express')
const config = require('./config/env/config')
const app = express()
const http = require('http').Server(app)
// const io = require('socket.io')(http)
require('./app/helper/socket')(http)

const {
  sequelize
} = require('./app/models')

sequelize.sync({
  force: false
})
  .then(() => {
    http.listen(config.port, () => console.log('Server running at http://localhost:' + config.port))
  })

module.exports = app
