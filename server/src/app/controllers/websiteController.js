const { Website } = require('../models')
const captureWebsite = require('capture-website')
const fs = require('fs')
const path = require('path')

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
      Website.findById(req.params.id).then(website => {
        let url = website.url
        let filename = website.name + '_' + new Date().format('MMDDYYYYTHHmmss') + '.png'
        let filepath = path.join('img', filename)
        // check file exitst
        if (fs.existsSync(filepath)) {
          res.status(400).send('File exist')
        }
        // capture website
        captureWebsite.file(url, filepath, { }).then((result) => {
        //   Website.update({ currentVersion: filename }, { where: { id: website.id } }).then((website) => res.send(website))
        //   // TODO: check if content update
        //   // update prevVersion with currentVerion
        //   // update CurrentVersion
          res.send(result)
        })
      })
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
