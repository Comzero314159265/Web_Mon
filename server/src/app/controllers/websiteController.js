const { Website } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let websites = null
      websites = await Website.findAll({})
      res.send(websites)
    } catch (err) {
      res.status(400).send({
        error: err.errors
      })
    }
  },
  async show (req, res) {
    try {
      let websites = null
      websites = await Website.findById(req.params.id)
      res.send(websites)
    } catch (err) {
      res.status(400).send({
        error: err.errors
      })
    }
  },
  async post (req, res) {
    try {
      const web = await Website.create(req.body)
      res.send(web)
    } catch (err) {
      res.status(400).send({
        error: err.errors
      })
    }
  },
  async put (req, res) {
    try {
      const web = await Website.update(req.body, { where: { id: req.body.id } })
      res.send(web)
    } catch (err) {
      res.status(400).send({
        error: err.errors
      })
    }
  },
  async delete (req, res) {
    try {
      (await Website.findById(req.params.id)).destroy()
      res.status(200).send('success')
    } catch (err) {
      res.status(400).send({
        error: err.errors
      })
    }
  }

}
