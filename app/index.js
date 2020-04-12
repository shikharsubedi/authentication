const express = require('express')
const app = express()
const connect = require('./db')

connect().then(() => {
require('./routes')(app)
app.listen(8080, ()=> {console.log('app started and running at port 8080')})
})
