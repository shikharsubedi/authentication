const mongoose = require('mongoose')

const user = {
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }

}
const schema = new mongoose.Schema(user)

module.exports = mongoose.model('User',  schema)