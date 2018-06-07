const pidusage = require('pidusage')
setInterval(() => {
  pidusage(process.pid, (err, stats) => {
    console.log(stats)
  })
}, 1000)
