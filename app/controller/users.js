const mongoose =  require('mongoose')
const hash = require('password-hash')
const User = require('../model/user')

async function register(req, res, next) {
  try {
    const { username, password, firstName, lastName } = req.body
    const errors = validate(username, password, firstName, lastName)
    if(errors.length) {
      res.status = 400
      return res.send(`fields cannot be empty`)
    }
    const existingUser = await User.findOne({username})
    if(existingUser) {
      res.status = 409
      return res.send(`${username} is already taken.`)
    }
    const hashedPassword = hash.generate(password)
    const newUser = new User()
    Object.assign(newUser, {
      username,
      password:hashedPassword,
      firstName,
      lastName
    })
    await newUser.save()
    res.status(201)
    res.send({
      status: 'success',
      message: `User with username ${username} created`
    })
  } catch(err) {
    res.status(500)
    return res.send('Could not create user ' + err.message)
  }
}
function validate(...args) {
  const errors = args.filter(arg => arg == null || arg.trim() === '')
  return errors
}

async function login(req, res, next) {
  try {
    const  { username, password } = req.body
    const errors = validate(username, password)
    if(errors.length) {
      res.statusCode = 400
      return res.send(`fields cannot be empty` )
    }
    const user = await User.findOne({username})
    if(!user) {
      res.status(401)
      return res.send(`username ${username} not found`)
      
    }
    if(!hash.verify(password, user.password)) {
      res.status(401)
      return res.send(`incorrect username, password`)
    }
    res.statusCode = 200
    res.send({
      status: 'success',
      message: `username, password is correct`
    })
  } catch(err) {
    res.status = 500
    res.send('Server error  ' + err.message)
  }

}
module.exports = {
  register,
  login
}
