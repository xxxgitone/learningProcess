var http = require('http');
var fs = require('fs');
var request = require('request');

http.createServer(function (req,res) {
	// fs.readFile('../buffer/linux.jpg', function (err, data) {
	// 	if (err) {
	// 		res.end('file not exist');
	// 	}else{
	// 		res.writeHeader(200, {'Context-Type': 'text/html'});
	// 		res.end(data);
	// 	}
	// })
	
	// fs.createReadStream('../buffer/linux.jpg').pipe(res);
	
	request('http://img.mukewang.com/53fed63700018a9306000338-228-128.jpg').pipe(res);

}).listen(8000);