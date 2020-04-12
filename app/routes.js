const parser = require('body-parser')
const users = require('./controller/users')
const jsonParser = parser.json()

module.exports = app => {
  app.post('/register',jsonParser, users.register)
  app.post('/login', jsonParser, users.login)
}
