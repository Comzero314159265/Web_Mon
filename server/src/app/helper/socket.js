const { Website } = require('../models')
const { bot } = require('./autobot')
const systemconfig = require('../../config/systemconfig')
const { Available } = require('../models')

async function updateWebsite (io) {
  try {
    let websites = await Website.findAll({})
    await Promise.all(websites.map(website => bot(website)))
    websites = await Website.findAll({})
    console.log('data Updated!!!')
    io.emit('websitesUpdate', websites)
  } catch (error) {
    console.log(error)
  }
}

async function getWebsites (io = null) {
  try {
    let websites = await Website.findAll({})
    io.emit('websitesUpdate', websites)
  } catch (error) {
    console.log(error)
  }
}

async function getAvailable (id, io) {
  try {
    let availables = await Available.findAll({ where: { websiteID: id } })
    io.emit('getAvailable', availables)
  } catch (error) {
    console.log(error)
  }
}

module.exports = (http) => {
  const io = require('socket.io')(http)
  const min = 1000 * 60
  let refeshtime = min * systemconfig.refesh_time
  let interval = setInterval(() => {
    updateWebsite(io)
  }, refeshtime)

  io.on('connection', async function (socket) {
    console.log('Client connected!!!')
    // first update when client connect
    getWebsites(socket)
    // await updateWebsite(socket)
    // Set interval time
    socket.on('setIntervel', time => {
      clearInterval(interval)
      systemconfig.refeshtime = time
      interval = setInterval(() => {
        updateWebsite(io)
      }, (min * systemconfig.refesh_time))
      console.log('Change time to ' + time + ' min')
    })
    // get setting
    socket.emit('getSetting', systemconfig)
    // get setting
    socket.on('setSetting', config => {
      console.log(config)
    })
    // add website
    socket.on('addWebsite', () => {
      updateWebsite(io)
    })
    // get Available
    socket.on('getAvailable', (id) => {
      getAvailable(id, socket)
      console.log('Available' + id)
    })
    socket.on('disconnect', function () {
      console.log('Client disconnected!!!')
    })
  })
}
