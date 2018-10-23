const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { sign } = require('jsonwebtoken');
const { secret } = require('./config');
const jwt = require('koa-jwt')({ secret });
const app = new Koa();
const router = new Router();
const detail = new Router();
app.use(bodyParser());

detail.get('/info', async ctx => {
  ctx.body = {
    username: ctx.state.user.username
  };
});

router
  .post('/api/login', async (ctx, next) => {
    const user = ctx.request.body;
    if (user && user.username) {
      let { username } = user;
      const token = sign({ username }, secret, { expiresIn: '1h' });
      ctx.body = {
        message: 'Get Token Success',
        code: 1,
        token
      };
    } else {
      ctx.body = {
        message: 'Param Error',
        code: -1
      };
    }
  })
  .use('/api/user', jwt, detail.routes(), detail.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log('app listening 3000...');
});
