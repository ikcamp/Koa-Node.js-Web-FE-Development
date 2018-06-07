const Koa = require('koa');
const Router = require('koa-router');
const Http = require('http');
const Querystring = require('querystring')

const app = new Koa();
const router = new Router();

const Service = {
    search: async (kw = '') => {
        return new Promise((resolve, reject) => {
            Http.request({
                hostname: 'm.maoyan.com',
                path: '/ajax/search?' + Querystring.stringify({
                    kw,
                    cityId: 10
                })
            }, (res) => {

                res.setEncoding('utf8');

                let data = [];

                res.on('data', (chunk) => {
                    data.push(chunk)
                }).on('end', () => {
                    resolve(data.join(''));
                });

            }).end();
        });
    }
}

const Render = (data = {}, kw = '') => {

    let arr = [
        '<style>',
        '*{margin:0;padding:0;font-size: 12px;}',
        'body{padding:10px}',
        'button{padding: 0 10px;line-height: 20px;margin-left: 10px;}',
        'input{line-height: 20px; width: 200px;padding: 0 5px;}',
        'h3{font-size: 14px;}',
        'i{font-size: 14px;font-style: inherit;color: #f80;}',
        'p{color:#666;}',
        '.item{padding:10px 0 10px 0;border-bottom:1px solid #d2d2d2;display:flex;}',
        '.info{margin-left:10px}',
        '</style>',
        '<form><input name="kw" value="' + kw + '"/><button>搜索</button></form>'
    ];

    data.movies && data.movies.list.forEach(item => {
        arr.push('<div class="item">')
        arr.push('<img src="' + item.img.replace('w.h', '64.90') + '"/>')
        arr.push('<div class="info">')
        arr.push('<h3>' + item.nm.replace(new RegExp(kw, 'g'), '<i>' + kw + '</i>') + '（' + item.enm + '）' + item.ver + '</h3>')
        arr.push('<p>' + item.cat + '</p>')
        arr.push('<p>' + item.star + '</p>')
        arr.push('<p>' + item.pubDesc + '</p>')
        arr.push('<p>' + item.sc + '分</p>')
        arr.push('</div>')
        arr.push('</div>')
    });

    return arr.join('')
}

router.get('/', async (ctx, next) => {
    let { kw } = ctx.query;
    let data = await Service.search(kw);
    ctx.body = Render(JSON.parse(data), kw);
});

app.use(router.routes()).listen(8080, () => {
    console.log('Server is running at http://localhost:8080')
})