var fs = require('fs');

fs.createReadStream('1.mp4').pipe(fs.createWriteStream('1_stream.mp4'));