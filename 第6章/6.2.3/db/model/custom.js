const Sequelize = require('sequelize')
const sequelize = new Sequelize('custom', 'username', 'password', {
  dialect: 'mysql'
})

const Customer = sequelize.define('customer', {
  id:{
    type: Sequelize.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false
  },
  sex: {
    type: Sequelize.ENUM(['man', 'women']),
    allowNull: false
  },
  address:{
    type: Sequelize.STRING
  },
  fullAddress:{
    get(){
      return `${this.getDateValue('country')}${this.getDateValue('city')}${this.getDateValue('address')}`
    }
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING
  },
  country:{
    type: Sequelize.STRING
  },
  city: {
    type: sequelize.STRING
  }  
})

module.exports = {
  Customer
}