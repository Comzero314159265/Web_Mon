const { Website } = require('../models')
// const { Setting } = require('../models')
// const schedule = require('node-schedule')
const { bot } = require('./autobot')
async function updateDate (io = null) {
  try {
    let websites = await Website.findAll({})
    await Promise.all(websites.map(website => bot(website)))
    websites = await Website.findAll({})
    // console.log('data Updated!!!')
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

module.exports = (http) => {
  const io = require('socket.io')(http)
  const min = 1000 * 60
  let refeshtime = min * 5
  let interval = setInterval(() => {
    updateDate(io)
  }, refeshtime)

  io.on('connection', async function (socket) {
    console.log('Client connected!!!')
    // first update when client connect
    await getWebsites(socket)
    await updateDate(socket)
    socket.on('setIntervel', time => {
      clearInterval(interval)
      interval = setInterval(() => {
        updateDate(io)
      }, (min * time))
      console.log('Change time to ' + time + ' min')
    })
    // Logic
    socket.on('disconnect', function () {
      console.log('Client disconnected!!!')
    })
  })
}
