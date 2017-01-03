var http = require('http');

http.createServer(function (req,res) {
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.write('Hello Node.js');
	res.end();
}).listen(3000);