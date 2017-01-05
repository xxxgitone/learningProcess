var http = require('http');

http.createServer(function (req, res) {
	//规范url，去掉查询字符串、可选反斜杠，并变成小写
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	
	switch(path){
		case '':
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('HomePage');
			break;
		case '/about':
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('About');
			break;
		default:
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('Not Found');
			break;
	}
	console.log(path);
}).listen(3000);

console.log('Server started on localhost:3000');