const path = require("path");
const fs = require('fs');
module.exports = function (opts) {
    let {app,rules = []} = opts;
    // 如果参数缺少实例 app，则抛出错误
    if (!app) { 
        throw new Error("the app params is necessary!");
    }
    // 提取出 app 实例对象中的属性名
    const appKeys = Object.keys(app); 
    rules.forEach((item) => {
        let {folder,name} = item;
        // 如果 app 实例中已经存在了传入过来的属性名，则抛出错误
        if (appKeys.includes(name)) { 
            throw new Error(`the name of ${name} already exists!`);
        }
        let content = {};
        //读取指定文件夹下(dir)的所有文件并遍历
        fs.readdirSync(folder).forEach(filename => {
            let extname = path.extname(filename); 			// 取出文件的后缀
            if (extname === '.js') {							// 只处理js文件
                let name = path.basename(filename, extname); 	// 将文件名中去掉后缀
                //读取文件中的内容并赋值绑定
                content[name] = require(path.join(folder, filename)); 
            }
        });
        app[name] = content;
    })
}
