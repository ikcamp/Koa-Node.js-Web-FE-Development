const Sequelize = require('sequelize');

const sequelize = new Sequelize('custom', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate().then(()=>{
  console.log('Connected')
}).catch(err=>{
  console.error('Connect failed')
});

const Customer = sequelize.define('customer', {
  id: {
    type: Sequelize.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sex: {
    type: Sequelize.ENUM(['man', 'women']),
    allowNull: false
  },
  address: {
    type: Sequelize.STRING
  },
  fullAddress: {
    type: Sequelize.STRING,
    get () {
      return `${this.getDataValue('country')}${this.getDataValue('city')}${this.getDataValue('address')}`
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  }
})

// Customer.sync({ force: true });

module.exports = {
  Customer
}