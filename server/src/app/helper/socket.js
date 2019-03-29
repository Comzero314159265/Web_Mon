const { Website } = require('../models')
const schedule = require('node-schedule')

module.exports = (http) => {
  // console.log('a user connect')
  const io = require('socket.io')(http)
  let rule = new schedule.RecurrenceRule()
  rule.minute = new schedule.Range(0, 59, 5)
  let job = schedule.scheduleJob('screapping', rule, function () {
    io.sockets.emit('updateWebsite', getWebsites(io.sockets))
  })

  function getWebsites (socket) {
    try {
      // socket.emit('websitesUpdate', data)
      (Website.findAll({})).then(
        function (data) {
          socket.emit('websitesUpdate', data)
        }
      )
    } catch (error) {
      // console.log(error)
    }
  }

  io.on('connection', function (socket) {
    console.log('a client connected!!')
    // send init data
    getWebsites(socket)

    // set interval time
    socket.on('clien_setinterval', function (data) {
      console.log('Set time interval to ' + data + ' min')
      job.cancel()
      rule.second = null
      rule.minute = data
      job.reschedule(rule)
      console.log('restart job with rule : min:' + rule.minute)
    })

    //
  })
}
