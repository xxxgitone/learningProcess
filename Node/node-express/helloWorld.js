
/**该文件为回顾基础的代码
 * 
 * 手动创建服务，路由
 */

const http = require('http');

http.createServer(function(req, res) {
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('Hello wodld');

    console.log(req.url);

    //处理路由,去掉查询字符串、可选的反斜杠、并变成小写
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    
    switch(path) {
        case '':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            break;
    }
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate...');