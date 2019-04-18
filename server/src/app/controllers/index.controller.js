const path = require('path')
exports.screenshot = (req, res) => {
  try {
    const url = req.params.path
    if (url === 'null') {
      res.sendFile(path.join('images', 'image-not-found.png'), { root: path.resolve(__dirname, '../../../public') })
    } else {
      res.sendFile(path.join('img', url), { root: path.resolve(__dirname, '../../../') })
    }
  } catch (error) {
    console.log(error)
  }
}
