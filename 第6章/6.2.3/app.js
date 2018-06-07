const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const { getAllCustomers, getCustomerById, getCustomerByName, createCustomer, updateCustomer, deleteCustomer } = require('./db')
const bodyParser = require('koa-bodyparser')
const jsonMIME = 'application/json'

router.get('/customer', async (context) => {
  const customers = await getAllCustomers()
  context.type = jsonMIME
  context.body = {
    status: 0,
    data: customers
  }
})

router.get('/customer/:id', async context => {
  const customer = await getCustomerById(context.params.id)
  context.type = jsonMIME
  context.body = {
    status: 0,
    data: customer
  }
})

router.get('/customer/name/:name', async context => {
  const customer = await getCustomerByName(context.params.name)
  context.type = jsonMIME
  context.body = {
    status: 0,
    data: customer
  }
})

router.post('/customer', async context => {
  const customer = context.body
  await createCustomer(customer)
  context.type = jsonMIME
  context.body = {
    status: 0
  }
})

router.put('/customer/:id', async context => {
  const id = context.params.id
  const customer = context.body
  await updateCustomer(id, customer)
  context.type = jsonMIME
  context.body = {
    status: 0
  }
})

router.delete('/customer/:id', async context => {
  await deleteCustomer(context.params.id)
  context.type = jsonMIME
  context.body = {
    status: 0
  }
})

app.use(async (context, next) => {
  try {
    await next()
  } catch (ex) {
    context.type = jsonMIME
    context.body = {
      status: -1,
      message: ex.message
    }
  }
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen('4001')