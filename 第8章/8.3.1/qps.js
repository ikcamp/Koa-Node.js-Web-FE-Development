let count = 0
let previousTime = Date.now()

function inc () {
  count++
}

function qps () {
  const now = Date.now()
  const duration = now - previousTime
  previousTime = now
  const qps = count * 1000 / duration
  count = 0
  return qps
}


const http = require('http')
const server = http.createServer((req, res)=>{
  // do something
  inc()
})
server.listen(8080)
setInterval(qps, 1000)


