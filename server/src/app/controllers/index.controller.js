exports.render = (req, res) => {
  res.send('Hello World')
}

exports.login = (req, res) => {
  console.log(req.body)
  console.log('Email: ' + req.body.email)
  console.log('Password:: ' + req.body.password)

  res.json(req.body)
}
