var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();

//不得对同一个事件监听10次以上，通过下面代码可以设置
life.setMaxListeners(11);

//addEventListener

function water(who) {
	console.log('给 ' + who + ' 倒水');
}


life.on('求安慰', water);

life.on('求安慰', function (who) {
	console.log('给 ' + who + ' 揉肩');
})

life.on('求安慰', function (who) {
	console.log('给 ' + who + ' 03');
})

life.on('求安慰', function (who) {
	console.log('给 ' + who + ' 4');
})

life.on('求安慰', function (who) {
	console.log('给 ' + who + ' 5');
})

life.on('求安慰', function (who) {
	console.log('给 ' + who + ' 6');
})

life.on('求安慰', function (who) {
	console.log('给 ' + who + ' 7');
})

life.on('求安慰', function (who) {
	console.log('给 ' + who + ' 8');
})

life.on('求安慰', function (who) {
	console.log('给 ' + who + ' 9');
})

life.on('求安慰', function (who) {
	console.log('给 ' + who + ' 10');
})

life.on('求安慰', function (who) {
	console.log('给 ' + who + ' 11');
})

//移除事件
life.removeListeners('求安慰',water);
life.removeAllListeners();//移除全部时间事件
life.removeAllListeners('求安慰');//移除求安慰的监听


life.emit('求安慰', '汉子');

// console.log(life.listeners('求安慰').length);