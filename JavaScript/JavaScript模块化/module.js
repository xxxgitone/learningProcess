// (function(){

// 	var myGrades=[93,95,88,0,55,91];

// 	var average=function(){
// 		//reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值。
// 		//语法：arr.reduce(callback,[initialValue])
// 		//参数
// 		/*
// callback
//     执行数组中每个值的函数，包含四个参数

//     previousValue
//         上一次调用回调返回的值，或者是提供的初始值（initialValue）
//     currentValue
//         数组中当前被处理的元素
//     index
//         当前元素在数组中的索引
//     array
//         调用 reduce 的数组

// initialValue
//     作为第一次调用 callback 的第一个参数。 
// 	*/
// 		var total=myGrades.reduce(function(accumulator,item){
// 			return accumulator+item;
// 		},0);

// 		return 'Your average grade is'+total/myGrades.length+'.';
// 	}
// 	/*
// 	filter() 方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。
// 	语法：var new_arrary = arr.filter(callback[, thisArg])
// 	callback
//     用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。
//     返回true表示保留该元素（通过测试），false则不保留。
// 	*/
// 	var failing = function(){ 

// 		var failingGrades = myGrades.filter(function(item) {
// 			return item < 70;
// 		}); 
// 		return 'You failed ' + failingGrades.length + ' times.'; 
// 	} 

// 	console.log(average());
// 	console.log(failing());

// })();


//循环和闭包
/*
for (var i = 1; i <= 5; i++) {
	setTimeout(function timer() {
		console.log(i);
	}, i * 1000);
}
*/
//正常情况下，我们对这段代码行为的预期是分别输出数字 1~5，每秒一次，每次一个。
//但实际上，这段代码在运行时会以每秒一次的频率输出五次 6。
//这个循环的终止条件是 i 不再 <=5 。条件首次成立时 i 的值是6。因此，输出显示的是循环结束时 i 的最终值。
//延迟函数的回调会在循环结束时才执行


//如果作用域是空的，那么仅仅将它们进行封闭是不够的。仔细看一下，我们的 IIFE 只是一
//个什么都没有的空作用域。它需要包含一点实质内容才能为我们所用。
/*
for (var i = 1; i <= 5; i++) {
	(function() {
		var j = i;
		setTimeout(function timer() {
			console.log(j);
		}, j * 1000);
	})();
}
*/
/*
//改进
for (var i = 1; i <= 5; i++) {
	(function(j) {
		setTimeout(function timer() {
			console.log(j);
		}, j * 1000);
	})(i);
}
*/
/*
//用let来改写
for(var i = 1; i <= 5; i++){
	let j=i; //闭包的块作用域
	setTimeout(function timer(){
		console.log(j);
	},i*1000)
}

for(let i = 1; i <= 5; i++){
	setTimeout(function timer(){
		console.log(i);
	},i*1000)
}
*/
/*
//模块
function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log(something);
	}

	function doAnother() {
		console.log(another.join(" ! "));
	}

	return{
		doSomething:doSomething,
		doAnother:doAnother
	}
}

var foo=CoolModule();
foo.doSomething();  //cool
foo.doAnother();//1 ! 2 ! 3 

*/


//这个模式在 JavaScript 中被称为模块。最常见的实现模块模式的方法通常被称为模块暴露，
//这里展示的是其变体。

//模块模式需要具备两个必要条件
//1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
//2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并
//且可以访问或者修改私有的状态。

/*
//当只需要一个实例时，可以对这个模式进行简单的改进来实现单例模式
var foo=(function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log(something);
	}

	function doAnother() {
		console.log(another.join(" ! "));
	}

	return{
		doSomething:doSomething,
		doAnother:doAnother
	}
})();

foo.doSomething();  //cool
foo.doAnother();//1 ! 2 ! 3 
*/

/*
//模块也是普通函数，因此也可以接受参数
function CoolModule(id) {
	function identify() {
		console.log(id);
	}
	return {
		identify: identify
	};
}

var foo1 = CoolModule('foo 1');
var foo2 = CoolModule('foo 2');

foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"


//模块模式另一个简单但强大的变化用法是，命名将要作为公共 API 返回的对象：

var foo = (function CoolModule(id) {
	function change() {
		// 修改公共 API
		publicAPI.identify = identify2;
	}

	function identify1() {
		console.log(id);
	}

	function identify2() {
		console.log(id.toUpperCase());
	}
	var publicAPI = {
		change: change,
		identify: identify1
	};

	return publicAPI;
})("foo module");

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
*/

//现代模块机制
//大多数模块依赖加载器 / 管理器本质上都是将这种模块定义封装进一个友好的 API。

//核心概念:
var MyModules = (function Manager() {
	var modules = {};

	function define(name, deps, impl) {
		for (var i = 0; i < deps.length; i++) {
			deps[i] = modules[deps[i]];
		}
		modules[name] = impl.apply(impl, deps); //核心
	}

	function get(name) {
		return modules[name];
	}

	return {
		define: define,
		get: get
	}

})();

MyModules.define('bar', [], function() {

	function hello(who) {
		return 'let me introduce: ' + who;
	}

	return {
		hello: hello
	}
})

MyModules.define("foo", ["bar"], function(bar) {
	var hungry = "hippo";

	function awesome() {
		console.log(bar.hello(hungry).toUpperCase());
	}
	return {
		awesome: awesome
	};
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");
console.log(
	bar.hello("hippo");
); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO

//" foo " 和 "bar" 模块都是通过一个返回公共 API 的函数来定义的。 "foo" 甚至接受 "bar" 的
//示例作为依赖参数，并能相应地使用它


//未来模块化机制ES6

//bar.js
function hello(who) {
	return "Let me introduce: " + who;
}
export hello;

//foo.js
// 仅从 "bar" 模块导入 hello()
import hello from "bar";
var hungry = "hippo";

function awesome() {
	console.log(
		hello(hungry).toUpperCase()
	);
}
export awesome;

//baz.js
// 导入完整的 "foo" 和 "bar" 模块
module foo from "foo";
module bar from "bar";
console.log(
	bar.hello("rhino")
); // Let me introduce: rhino
foo.awesome(); // LET ME INTRODUCE: HIPPO