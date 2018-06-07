const { Product, Project } = require('./define')
const { Op } = require('sequelize')
// 获取所有数据
await Product.findAll()
// SELECT name, date
await Project.findAll({
  attributes: ['name', 'date']
})
// WHERE name like '%t'
await Project.findAll({
  where: {
    name: {
      [Op.like]: 't%'
    }
  }
})

// WHERE createdAt > [timestamp] and createdAt < [timestamp]
await Product.findAll({
  where: {
    createdAt: {
      [Op.lt]: new Date(),
      [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
    }
  }
})

// WHERE (name = 'test1' or name='test2') and createdAt > [timestamp]
await Product.findAll({
  where: {
    name: {
      [Op.or]: {
        [Op.eq]: 'test1',
        [Op.eq]: 'test2'
      }
    },
    createdAt: {
      [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
    }
  }
})

//Where name = 'test' or createdAt >= [timestamp] 
await Product.findAll({
  where: {
    [Op.or]: {
      name: {
        [Op.eq]: 'test'
      },
      createdAt: {
        [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000)
      }
    }
  }
})
