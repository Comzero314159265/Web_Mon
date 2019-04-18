const express = require('express')
const morgan = require('morgan')
const compession = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = () => {
  const app = express()
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  } else {
    app.use(compession)
  }
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.use(bodyParser.json())
  app.use(cors())
  require('../app/routes/index.routes')(app)

  app.use(express.static(__dirname + '/public/'))

  return app
}
