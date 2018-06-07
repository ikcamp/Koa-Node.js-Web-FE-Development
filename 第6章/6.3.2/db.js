const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {
  user: 'username',
  pass: 'password',
  poolSize: 10
})
const db = mongoose.connection

db.on('error', err => {
  console.error(err)
})

db.on('open', () => {
  // we are connected
})

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Category = mongoose.model('Category', categorySchema)
const category = new Category({
  name: 'test',
  description: 'test category'
})
category.save(error => {
  if (error) {
    console.error(error)
    return
  }
  console.log('saved')
})

Category.create({
  name: 'test',
  description: 'test category'
}, (error, category) => {
  if (error) {
    console.error(error)
  }else {
    console.log(category)
  }
})

Category.find({
  name: 'test'
}, (err, res) => {
  if (err) {
    // handle error
  }else {
    console.log(res)
  }
})

Category.find({
  name: /^t/
}).then(res => {
}).catch(err => {
})

Category.where('createdAt')
  .lt(new Date())
  .select('name, description')
  .sort({createdAt: 1})
  .limit(10)
  .exec((err, res) => {
  })

Category.remove({
  name: 'test'
}).then(() => {
})

Category.update({
  name: 'test'
}, {
  name: 'test1',
  description: 'test1'
}).then(() => {
})

