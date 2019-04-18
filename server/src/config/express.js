const express = require('express')
const morgan = require('morgan')
const compession = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

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

  app.use(express.static('public'))

  if (process.env.NODE_ENV === 'development') {
    app.get(/.*/, (req, res) => res.sendFile('index.html', { root: path.resolve(__dirname, '../../public') })
    )
  }

  return app
}
