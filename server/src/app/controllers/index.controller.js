const axios = require('axios')
const mime = require('mime')

const regex = /\s+(href|src)=['"](.*?)['"]/g

const getMimeType = url => {
  if (url.indexOf('?') !== -1) {
    url = url.split('?')[0]
  }
  return mime.getType(url) || 'text/html'
}

exports.index = (req, res) => {
  const { url } = req.query
  if (!url) {
    res.type('text/html')
    return res.end('You need to specify <code>url</code> query parameter')
  }

  axios.get(url, { responseType: 'arraybuffer' })
    .then(({ data }) => {
      const urlMime = getMimeType(url)
      if (urlMime === 'text/html') {
        data = data.toString().replace(regex, (match, p1, p2) => {
          let newUrl = ''
          if (p2.indexOf('http') !== -1) {
            newUrl = p2
          } else if (p2.substr(0, 2) === '//') {
            newUrl = 'http:' + p2
          } else {
            const searchURL = new URL(url)
            newUrl = searchURL.protocol + '//' + searchURL.host + p2
          }
          return (' ' + p1 + '=' + req.protocol + '://' + req.hostname + ':3000' + '?url=' + newUrl)
        })
      }
      console.log(urlMime)
      res.type(urlMime)
      res.send(data)
    }).catch(error => {
      console.log(error)
    })
}

exports.screenshot = (req, res) => {
  const path = require('path')
  const url = req.params.path
  res.sendFile(path.join('img', url), { root: path.resolve(__dirname, '../../../') })
}
