const { Website } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let websites = null
      websites = await Website.findAll({})
      res.send(websites)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the song : ' + err
      })
    }
  },
  async post (req, res) {
    try {
      const web = await Website.create(req.body)
      res.send(web)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the song'
      })
    }
  }
}
