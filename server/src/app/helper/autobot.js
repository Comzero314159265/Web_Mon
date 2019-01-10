const async = require('async')
const axios = require('axios')

const delay = 10000
var start = Date.now()

axios.interceptors.request.use(request => {
  console.log(JSON.stringify(request.url))
  start = Date.now()
  return request
})

axios.interceptors.response.use(response => {
  console.log('RES TIME: ' + (Date.now() - start))
  return response
})

module.exports = () => {
  async.forever(
    (next) => {
      console.time('response_time')
      // var start = Date.now()
      axios.all([
        axios.get('https://etda.or.th'),
        axios.get('https://google.com')
      ])
        .then(response => {
          // console.timeEnd('response_time')
          // console.log('RES TIME: ' + (Date.now() - start))
          setTimeout(() => {
            next()
          }, delay)
        })
        .catch(error => {
          console.log(error)
        })
    }
  )
}
