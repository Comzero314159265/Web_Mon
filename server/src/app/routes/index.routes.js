module.exports = (app) => {
  const index = require('../controllers/index.controller')
  const website = require('../controllers/websiteController')

  app.get('/', index.render)
  app.post('/login', index.login)
  // Website
  app.get('/website', website.index)
  app.post('/website', website.post)
}
