var path = require('path');
var arguments = process.argv;
var directory = arguments[2]?arguments[2]:'union_wallet';
// var directory = arguments[2];
// if(!directory){
//     console.log('请输入项目目录名');
//     process.exit();
// }
module.exports = {
    entryApp: 'src/'+directory+'/app.js',   // 项目入口app.js文件
    build: {
        env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
        index: path.resolve(__dirname, '../statics/'+directory+'/index.html'), // 编译输入的 index.html 文件
        assetsRoot: path.resolve(__dirname, '../statics/'+directory+''), // 编译输出的静态资源路径
        assetsEntry: 'src/'+directory+'/index.html',
        assetsSubDirectory: 'static', // 编译输出的二级目录
        // assetsPublicPath: 'https://s0.ruwe.cn/'+directory+'/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        assetsPublicPath: '/'+directory+'/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        productionSourceMap: false, // 是否开启 cssSourceMap
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false, // 是否开启 gzip
        productionGzipExtensions: ['js', 'css'] // 需要使用 gzip 压缩的文件扩展名
    },
    dev: {
        env: require('./dev.env'), // 使用 config/dev.env.js 中定义的编译环境
        port: 8020, // 运行测试页面的端口
        assetsEntry:'src/'+directory+'/index.html',
        assetsSubDirectory: 'static', // 编译输出的二级目录
        assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        cssSourceMap: false,// 是否开启 cssSourceMap
        proxyTable: {
            '/api': {
                target: 'http://192.168.199.105:7011', // 测试：http://gprs.tst.ruwe.cn/  内网环境http://m.ruowei.cn/  本地：http://192.168.199.188:7011
                changeOrigin: true,               // needed for virtual hosted sites
                ws: true,                         // websockets代理
                pathRewrite: {
                    '^/api/old-path' : '/api/new-path',     // 重新请求路径 path
                    '^/api/remove/path' : '/path'           // remove base path
                },
                router: {
                    // when request.headers.host == 'dev.localhost:3000',
                    // override target 'http://www.example.org' to 'http://localhost:8000'
                    'dev.localhost:3000' : 'http://localhost:8000'
                }
            }
        }// 需要 proxyTable 代理的接口（可跨域）
    }
}
