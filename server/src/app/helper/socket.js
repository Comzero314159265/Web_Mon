module.exports = (http) => {
  // console.log('a user connect')
  const io = require('socket.io')(http)

  io.on('connection', function (socket) {
    console.log('a client connected!!')
    socket.emit('websites', { websites: [ { id: 1, name: 'etda', url: 'https://www.etda.or.th' } ] })
  })
}
