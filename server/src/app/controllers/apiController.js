// const https = require('https')
// const axios = require('axios')
// const instance = axios.create({
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false
//   })
// })
const bot = require('../helper/autobot')
exports.index = async (req, res) => {
  try {
    bot.cancel()
    res.end()
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.show = async (req, res) => {
  try {
    console.log(req.params.time)
    bot.setTime(req.params.time)
    res.end()
  } catch (error) {
    res.status(400).send(error)
  }
}
