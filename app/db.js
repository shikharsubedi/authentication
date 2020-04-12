'use strict'

const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect(
      'mongodb://localhost:27017/authentication',
      { useNewUrlParser: true }
    )

  } catch (err) {
    console.error('connection error', err.message)
  }
}

module.exports = connect