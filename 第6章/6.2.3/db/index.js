const {Customer} = require('./model/custom')
const {Op} = require('sequelize')

async function getAllCustomers() {
  return Customer.findAndCountAll({
    attributes: ['id', 'name', 'sex', 'fulladdress'],
    order:[
      ['updatedAt', 'DESC']
    ]
  })
}

async function getCustomerById(id){
  return Customer.findById(id)
}

async function getCustomerByName(name){
  return Customer.findAll({
    where:{
      name:{
        [Op.like]: `${name}%`
      }
    }
  })
}

async function updateCustomer(id, customer){
  const item = await getCustomerById(id)
  if(item){
    return item.update(customer)
  } else {
    throw new Error(`the customer with id ${id} is not exist`)
  }
}

async function createCustomer(customer){
  return Customer.create(customer)
}

async function deleteCustomer(id){
  const customer = await getCustomerById(id)
  if(customer){
    return customer.destroy()
  }
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  getCustomerByName,
  createCustomer,
  updateCustomer,
  deleteCustomer
}