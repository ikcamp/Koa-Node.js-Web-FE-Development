let previousCpuUsage = process.cpuUsage()
let previousHrTime = process.hrtime()
setInterval(() => {
  const currentCpuUsage = process.cpuUsage(previousCpuUsage)
  const currentHrTime = process.hrtime(previousHrTime)
  const duration = currentHrTime[0]* 1e6 + currentHrTime[1] / 1e3
  previousTime = currentHrTime
  previousCpuUsage = currentCpuUsage
  const cpuPercent = {
    user: currentCpuUsage.user / duration,
    system: currentCpuUsage.system / duration
  }
  console.log(cpuPercent)
}, 1000)
