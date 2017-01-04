var fs = require('fs');

var readStream = fs.createReadStream(1.mp4);
var writeStream = fs.createWriteStream(1_stream.mp4);

readStream.on('data', function (chunk) {
	//如果还没有写完，则停止读
	if (writeStream.write(chunk) === false) {
		console.log('still cached');
		readStream.pause();
	}
})

readStream.on('end', function () {
	writeStream.end();
})

//如果耗尽，则重启readStream
writeStream.on('drain',function () {
	console.log('data drains');
	readStream.resume();
});