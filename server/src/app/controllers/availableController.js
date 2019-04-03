const { Available } = require('../models')
exports.show = async (req, res) => {
  try {
    let availables = await Available.findAll({ where: { websiteID: req.params.id } })
    res.send(availables)
  } catch (error) {
    console.log(error)
  }
}
