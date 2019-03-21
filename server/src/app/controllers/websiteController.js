const { Website } = require('../models')
const captureWebsite = require('capture-website')
const fs = require('fs')
const path = require('path')
const https = require('https')
const axios = require('axios')
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

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
      let now = Date.now()
      let filename = website.name + '_' + now + '.png'
      let filepath = path.join('img', filename)
      let oldlink = website.current
      // capture website
      await captureWebsite.file(url, filepath, { })
      // TODO: check if content update
      // if have update version : update prevVersion with currentVerion
      // await Website.update({ prevVersion: website.currentVersion, currentVersion: filename }, { where: { id: website.id } })
      // update CurrentVersion
      let length = (await instance.get('https://www.etda.or.th')).data.length
      let update = {}
      if (!website.contentLength) {
        // await Website.update({ prev: filename, current: filename }, { where: { id: website.id } })
        update.contentLength = length
      }
      if (!website.prev) {
        // await Website.update({ prev: filename, current: filename }, { where: { id: website.id } })
        update.prev = filename
      }
      update.current = filename

      await Website.update(update, { where: { id: website.id } })
      // console.log(website.dataValues)
      website = await Website.findById(req.params.id)
      // percentage change more than threshold
      let diff = website.contentLength - length
      let percentage = diff % website.contentLength * 100
      let level = 0
      if (percentage > 10) {
        level = 1
      } else if (percentage > 50) {
        level = 2
      } else if (percentage > 60) {
        level = 3
      }
      website.dataValues.level = level
      res.send(website)
      if (oldlink) {
        let oldfile = path.join('img', oldlink)
        // check file exitst
        if (fs.existsSync(oldfile)) {
          fs.unlinkSync(oldfile)
        }
      }
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
