var fs = require('fs');

fs.readFile('linux.jpg', function(err, origin_buffer) {
	console.log(Buffer.isBuffer(origin_buffer));

	fs.writeFile('linux_buffer.jpg', origin_buffer, function(err) {
		if (err) {
			console.log(err);
		}
	});
	//转换成base64的编码格式
	// var base64Image = new Buffer(origin_buffer).toString('base64');
	var base64Image = origin_buffer.toString('base64');

	console.log(base64Image);
	
	//将base64Image以base64的编码格式转换出来
	var decodedImage = new Buffer(base64Image, 'base64');
	
	console.log(Buffer.compare(origin_buffer, decodedImage));

	fs.writeFile('linux_decoded.jpg', decodedImage, function (err) {
		if (err) {console.log(err);}
	})

})