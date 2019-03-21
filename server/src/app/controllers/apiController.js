const https = require('https')
const axios = require('axios')
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

exports.index = async (req, res) => {
  try {
    instance.get('https://www.etda.or.th').then(response => console.log(response.data.length)).catch(error => { console.log(error) })
  } catch (error) {
    res.status(400).send(error)
  }
}
