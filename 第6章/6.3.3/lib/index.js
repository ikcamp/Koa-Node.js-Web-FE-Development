const Course = require('./model/course')

async function getCourseList() {
  return await Course.find().sort({
    'startTime.time': 1
  })
}

async function getCourseById(id) {
  return await Course.findById(id)
}

async function getCourseByTime(start, end, weekday) {
  return await Course.find({
      weekday: weekday
    }).where('startTime.time').gte(start.hour * 100 + start.minute)
    .where('endTime.time').lte(end.hour * 100 + end.minute)
}

async function addCourse(course) {
  const {
    name,
    weekday,
    startTime,
    endTime
  } = course
  const item = await getCourseByTime(startTime, endTime, weekday)
  if (item) {
    throw new Error('当前时间段已经安排了课程')
  }
  return await Course.create(course)
}

async function updateCourse(id, course) {
  return await Course.update({
    _id: id
  }, course)
}

async function removeCourse(id) {
  return await Course.remove({
    _id: id
  })
}

module.exports = {
  getCourseList,
  getCourseById,
  getCourseByTime,
  addCourse,
  updateCourse,
  removeCourse
}