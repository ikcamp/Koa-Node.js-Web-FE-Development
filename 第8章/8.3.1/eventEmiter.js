const Koa = require('koa')
const {
  EventEmitter
} = require('events')
const app = new Koa()

app.use(async (context, next) => {
  const { protocol, href, headers } = context
  const startTime = Date.now()
  app.emit('beginRequest', {
    protocol,
    href,
    headers
  })
  await next()
  const { status } = context
  const responseTime = Date.now() - startTime
  app.emit('endRequest', {
    status,
    responseTime
  })
})


// qps

function averageResponseTime() {
  const count = 0
  const duration = 0
  app.on('endRequest', ({ responseTime }) => {
    count++
    duration += responseTime
  })
  setInterval(() => {
    const averageResponseTime = duration / count
    duration = 0
    count = 0
  }, 1000)
}