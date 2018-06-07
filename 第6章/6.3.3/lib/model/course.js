const mongoose = require('../conn').mongoose

const timeRangeSchema = new mongoose.Schema({
  hour: {
    type: Number,
    max: 18,
    min: 8
  },
  minute: {
    type: Number,
    max: 59,
    min: 0
  },
  time: {
    type:Number,
    get(){
      return this.get('hour')* 100 + this.get('minute')
    }
  }
})

const courseSchema = new mongoose.Schema({
  name: String,
  startTime: timeRangeSchema,
  endTime: timeRangeSchema,
  weekday: {
    type: Number,
    max: 6,
    min: 0
  }
})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course
