const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`;
});
router.get('/home', async (ctx, next) => {
    console.log(ctx.request.query);
    console.log(ctx.request.querystring);
    ctx.response.body = '<h1>HOME page</h1>';
});
router.get('/home/:id/:name', async(ctx, next)=>{
    console.log(ctx.params);
    ctx.response.body = '<h1>HOME page /:id/:name</h1>';
});
router.get('/404', async (ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>';
});
app.use(router.routes());
app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000');
});