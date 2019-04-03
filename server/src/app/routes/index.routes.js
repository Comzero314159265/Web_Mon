module.exports = (app) => {
  const index = require('../controllers/index.controller')
  const website = require('../controllers/websiteController')
  const available = require('../controllers/availableController')
  // const api = require('../controllers/apiController')

  // app.get('/', index.index)
  app.get('/screenshot/:path', index.screenshot)
  // Website
  app.get('/website', website.index)
  app.get('/website/:id', website.show)
  app.post('/website', website.post)
  app.delete('/website/:id', website.delete)
  app.put('/website', website.put)
  // available
  app.get('/available/:id', available.show)
}
