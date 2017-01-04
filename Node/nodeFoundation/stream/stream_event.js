var fs = require('fs');

var readStream = fs.createReadStream('stream_copy_logo.js');
var n = 0;

readStream
		.on('data', function (chunk) {
			n++;
			console.log('data emits');
			console.log(Buffer.isBuffer(chunk));
			//console.log(chunk.toString('utf8'));
			readStream.pause(); //暂停
			console.log('data pause');
			setTimeout(function () {
				console.log('data pause end!');
				readStream.resume();//重新启动
			},3000);
			
		})
		.on('readable',function () {
			console.log('data readable');
		})
		.on('end',function () {
			console.log(n);
			console.log('data end');
		})
		.on('close',function () {
			console.log('data close');
		})
		.on('error',function (e) {
			console.log(e);
		})