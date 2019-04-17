const { Website } = require('../models')
const { bot } = require('./autobot')
const systemconfig = require('../../config/systemconfig')
const min = 1000 * 60
let refeshTime = min * systemconfig.refeshTime
function updateWebsite (socket) {
  Promise.resolve(Website.findAll({})).then(websites => {
    Promise.all(websites.map(web => bot(web))).then(() => getWebsites(socket)).catch(err => console.log(err))
  })
}

function updateSingleWebsite (socket, website) {
  Promise.resolve(bot(website)).then(() => getWebsites(socket))
}

async function getWebsites (socket) {
  try {
    let websites = await Website.findAll({})
    socket.emit('websitesUpdate', websites)
  } catch (error) {
    console.log(error)
  }
}

async function setStable (id, io) {
  try {
    let website = await Website.findByPk(id)
    await Website.update({ stable: website.current, level: 0 }, { where: { id: id } })
    website = await Website.findByPk(id)
    io.emit('getSingleweb', website)
  } catch (error) {
    console.log(error)
  }
}

module.exports = (http) => {
  let io = require('socket.io')(http)
  let interval = setInterval(() => {
    updateWebsite(io)
  }, refeshTime)
  io.on('connection', function (socket) {
    console.log('Client conected!!!')
    Promise.resolve(getWebsites(socket))
    // get setting
    socket.emit('getSetting', systemconfig)
    // get setting
    socket.on('setSetting', config => {
      systemconfig.contentCheck = config.contentCheck
      systemconfig.titleCheck = config.titleCheck
      if (systemconfig.refeshTime !== config.titleCheck) {
        clearInterval(interval)
        refeshTime = min * config.refeshTime
        interval = setInterval(() => {
          updateWebsite(io)
        }, refeshTime)
      }
      systemconfig.refeshTime = config.refeshTime
      socket.emit('setSetting', systemconfig)
    })
    socket.on('updateSingleWebsite', website => {
      updateSingleWebsite(io, website)
    })
    // set Stable
    socket.on('setStable', id => {
      setStable(id, io)
      socket.emit('setStable')
    })
    // get single web
    socket.on('getSingleweb', id => {
      Website.findByPk(id).then(web => socket.emit('getSingleweb', web))
    })
    socket.on('disconnect', function () {
      console.log('Client disconnected!!!')
    })
  })
}
