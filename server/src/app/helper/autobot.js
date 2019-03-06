process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
const async = require('async')
const axios = require('axios')
const { Website } = require('../models')
// const { Available } = require('../models')
require('url')

const delay = 1000 * 60 * 60

// var start = null
// var currentweb = null
// axios.interceptors.request.use(request => {
//   start = Date.now()
//   currentweb = request.url
//   return request
// })

axios.interceptors.response.use(response => {
  // let restime = (Date.now() - start).toFixed(2)
  // console.log('RES TIME: ' + restime)
  // Website.findOne({ where: { url: currentweb } }).then(res => {
  //   console.log(res.name)
  //   Available.findOrCreate({ where: { websiteID: res.id }, defaults: { resMin: restime, resMax: restime } })
  //     .then((result, created) => {
  //       console.log(JSON.stringify(result))
  //       console.log('min :' + result.resMin + ', max :' + result.resMax)
  //       if (result.resMin > restime) {
  //         result.resMin = restime
  //         result.save()
  //           .then(res => {
  //             console.log('--------------------- updated ---------------------')
  //             console.log(res)
  //           })
  //       }
  //       if (result.resMax < restime) {
  //         result.resMax = restime
  //         result.save()
  //           .then(res => {
  //             console.log(res)
  //           })
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }).catch(err => console.log(err))
  return response
})

// const getMimeType = url => {
//   if (url.indexOf('?') !== -1) { // remove url query so we can have a clean extension
//     url = url.split('?')[0]
//   }
//   return mime.getType(url) || 'text/html' // if there is no extension return as html
// }

module.exports = () => {
  async.forever(
    (next) => {
      Website.findAll()
        .then(web => {
          let website = web
          axios.all(website.map(item => {
            return axios.get(item.url)
          }))
            .then(res => {
              setTimeout(() => {
                next()
              }, delay)
            })
            .catch(error => {
              if (error) { console.log(error) }
            })
        })
        .catch(error => {
          console.log(error)
          setTimeout(() => {
            next()
          }, delay)
        })
    },
    (error) => {
      console.log(error)
    }
  )
}
