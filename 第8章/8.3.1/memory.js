const v8 = require('v8')
function getMemoryUsage () {
  const usage = process.memoryUsage()
  const heapStatistics = v8.getHeapSpaceStatistics()
  console.log(usage, heapStatistics)
}
