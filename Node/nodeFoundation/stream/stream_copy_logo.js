var fs = require('fs');
var source = fs.readFileSync('../buffer/linux.jpg');

fs.writeFileSync('stream_copy_linux.jpg',source);

