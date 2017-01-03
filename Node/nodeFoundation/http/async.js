// var c = 0;

// function plus() {
// 	c += 1;
// }

// function printIt(){
// 	console.log(c);
// }

// plus();
// printIt();

// //1

//异步操作
// var c = 0;

// function plus() {
// 	setTimeout(function () {
// 		c += 1;
// 	},1000)
// }

// function printIt(){
// 	console.log(c);
// }

// plus();
// printIt();

//输出0


var c = 0;

function plus(callback) {
	setTimeout(function () {
		c += 1;
		callback();
	},1000)
}

function printIt(){
	console.log(c);
}

plus(printIt);  //回调1





