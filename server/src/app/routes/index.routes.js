module.exports = (app) => {
  const index = require('../controllers/index.controller')
  const website = require('../controllers/websiteController')

  app.get('/', index.index)
  app.get('/screenshot/:path', index.screenshot)
  // Website
  app.get('/website', website.index)
  app.get('/website/:id', website.show)
  app.post('/website', website.post)
  app.delete('/website/:id', website.delete)
  app.put('/website', website.put)
}
