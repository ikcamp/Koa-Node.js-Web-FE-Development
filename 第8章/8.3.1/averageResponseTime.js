const http = require('http')
let duration = 0
let count = 0
http.createServer((req, res) => {
  const start = Date.now()
  // do something
  count++
  duration += (Date.now() - start)
}).listen(4001)

setInterval(() => {
  let averageResponseTime = count === 0 ? 0 : duration / count
  duration = 0
  count = 0
  return averageResponseTime
}, 1000)
