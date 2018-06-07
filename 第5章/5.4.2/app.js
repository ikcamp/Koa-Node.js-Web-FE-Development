const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const multer = require('koa-multer');
const app = new Koa();
const router = new Router();
const upload = multer({
    dest: 'uploads/' // 指定上传文件的存储目录
});
const types = upload.single('avatar');
router.get('/upload', async (ctx, next) => {
    ctx.response.body =
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        <body>
            <form method='post' action='/profile' enctype='multipart/form-data'>
            选择图片：<input name="avatar" id='upfile' type='file'/>
            <input type='submit' value='提交'/>
        </form>
        </body>
    </html>`;
});
router.post('/profile', types, async function cb(ctx, next){
    const {
        originalname,
        path: out_path,
        mimetype
    } = ctx.req.file;
    let newName = out_path + path.parse(originalname).ext;
    let err = fs.renameSync(out_path, newName);
    let result;
    if (err) {
        result = JSON.stringify(err);
    } else {
        result = '<h1>upload success</h1>';
    }
    ctx.response.body = result;
});

app.use(router.routes());
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});