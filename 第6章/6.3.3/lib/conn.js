const mongoose = require('mongoose')
async function connect () {
  await mongoose.connect('mongodb://localhost/course', {
    user: 'username',
    pass: 'password'
  })
}

async function close () {
  await mongoose.connection.close()
}
module.exports = {
  mongoose,
  connect,
  close
}
