const { Website } = require('../models')
const captureWebsite = require('capture-website')
const fs = require('fs')
const path = require('path')

// async function createFile (url, name) {
//   const filename = path.join('img', name)
//   if (fs.existsSync(filename)) {
//     fs.rename(filename, filename + '(old)')
//   }
//   captureWebsite.file(url, filename)
// }

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
      let website = await Website.findById(req.params.id)
      let url = website.url
      let filename = 'screenshot_' + website.name + '.png'
      let filepath = path.join('img', filename)
      if (fs.existsSync(filepath)) {
        let oldpath = path.join('img', 'old_' + filename)
        fs.renameSync(filepath, oldpath)
      }
      await captureWebsite.file(url, filepath, { })
      await Website.update({ screenshot: filename }, { where: { id: website.id } })
      res.send(website)
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
