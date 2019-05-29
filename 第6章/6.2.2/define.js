const Sequelize = require('sequelize')
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect:'mysql',
  host:'localhost'
})



const Category = sequelize.define('category', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  name: Sequelize.STRING
})

const Project = sequelize.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull:false,
    unique: true
  },
  date: {
    type: Sequelize.DATE,
    defaultValue:Sequelize.NOW
  },
  description: Sequelize.TEXT
})

const Custom = sequelize.define('custom', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    get () {
      const title = this.getDataValue('title');
      return `${this.getDataValue('name')} (${title})`
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    set (val) {
      this.setDataValue('title', val.toUpperCase())
    }
  }
})

const Product = sequelize.define('product', {
  name: Sequelize.STRING
},{
  timestamps: true, // 禁止创建CreateAt和UpdateAt字段
  updatedAt: 'updateTimestamp', // 会创建updateTimestamp字段，替代UpdateAt字段
  tableName: 'my_product' // 修改创建的数据表名称为my_product
})

sequelize.sync().then(()=>{
  // done
}).catch(error => {
  // some error thrown
})

Product.sync()
Project.sync({force:true})

module.exports = {
  Product,
  Project,
  Category
}
