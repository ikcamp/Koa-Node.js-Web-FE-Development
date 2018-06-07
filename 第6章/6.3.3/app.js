const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const {
  connect,
  close
} = require('./lib/conn')
const {
  getCourseList,
  getCourseById,
  updateCourse,
  removeCourse,
  addCourse
} = require('./lib')
const bodyParser = require('koa-bodyparser')

const JSON_MIME = 'application/json'

router.get('/course', async (context) => {
  context.type = JSON_MIME
  context.body = {
    status: 0,
    data: await getCourseList()
  }
})

router.get('/course/:id', async context => {
  context.type = JSON_MIME
  context.body = {
    status: 0,
    data: await getCourseById(context.params.id)
  }
})

router.post('/course', async context => {
  context.type = JSON_MIME
  await addCourse(context.body)
  context.body = {
    status: 0
  }
})

router.put('/course/:id', async context => {
  await updateCourse(context.params.id, context.body)
  context.body = {
    status: 0
  }
})

router.delete('/course/:id', async context => {
  await removeCourse(context.params.id)
  context.body = {
    status: 0
  }
})

app.use(bodyParser())

app.use(async (context, next) => {
  try {
    await next()
  } catch (error) {
    context.type = JSON_MIME
    context.body = {
      status: -1,
      message: error.message
    }
  }
})

app.use(async (context, next) => {
  await connect()
  await next()
  await close()
})
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4001)