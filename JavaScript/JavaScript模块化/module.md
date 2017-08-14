# JavaScript模块化

## 1.什么是模块模式
称职的作家会把他的书分章节和段落；好的程序员会把他的代码分成模块。就好像书籍的一章，模块仅仅是一坨代码而已。好的代码模块分割的内容一定是很合理的，便于你增加减少或者修改功能，同时又不会影响整个系统。

## 2.为什么使用模块

* 可维护性：根据定义，每个模块都是独立的。良好设计的模块会尽量与外部的代码撇清关系，以便于独立对其进行改进和维护。维护一个独立的模块比起一团凌乱的代码来说要轻松很多。

* 命名空间：在JavaScript中，最高级别的函数外定义的变量都是全局变量（这意味着所有人都可以访问到它们）。也正因如此，当一些无关的代码碰巧使用到同名变量的时候，我们就会遇到“命名空间污染”的问题。这样的问题在我们开发过程中是要极力避免的。

* 可复用性：现实来讲，在日常工作中我们经常会复制自己之前写过的代码到新项目中。复制粘贴虽然很快很方便，但难道我们找不到更好的办法了么？要是……有一个可以重复利用的模块岂不妙哉？

## 3.如何应用模块

#### 模块模式


模块模式一般用来模拟类的概念（因为原生JavaScript并不支持类，虽然最新的ES6里引入了Class不过还不普及）这样我们就能把公有和私有方法还有变量存储在一个对象中——这就和我们在Java或Python里使用类的感觉一样。这样我们就能在公开调用API的同时，仍然在一个闭包范围内封装私有变量和方法。

* 原始写法


		　function m1(){
		　　　　//...
		　　}
		
		　　function m2(){
		　　　　//...
		　　}

	上面的函数m1()和m2()，组成一个模块。使用的时候，直接调用就行了。
	缺点："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

* 对象写法

		var module1 = new Object({
		
		　　　　_count : 0,
		
		　　　　m1 : function (){
		　　　　　　//...
		　　　　},
		
		　　　　m2 : function (){
		　　　　　　//...
		　　　　}
		
		　　});

	上面的函数m1()和m2(），都封装在module1对象里。使用的时候，就是调用这个对象的属性。

		module1.m1();

	但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。

		module1._count = 5;

* 立即执行函数写法


		var module1 = (function(){
		
		　　　　var _count = 0;
		
		　　　　var m1 = function(){
		　　　　　　//...
		　　　　};
		
		　　　　var m2 = function(){
		　　　　　　//...
		　　　　};
		
		　　　　return {
		　　　　　　m1 : m1,
		　　　　　　m2 : m2
		　　　　};
		
		　　})();

	使用上面的写法，外部代码无法读取内部的_count变量。

		console.info(module1._count); //undefined

* 放大模式

	如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"（augmentation）。

		var module1 = (function (mod){
	
		　　　　mod.m3 = function () {
		　　　　　　//...
		　　　　};
		
		　　　　return mod;
		
		　　})(module1);

	上面的代码为module1模块添加了一个新方法m3()，然后返回新的module1模块。

* 宽放大模式（Loose augmentation）


	在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。

		var module1 = ( function (mod){
		
		　　　　//...
		
		　　　　return mod;
		
		　　})(window.module1 || {});

	与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。

* 输入全局变量


	独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。

	为了在模块内部调用全局变量，必须显式地将其他变量输入模块。

		　var module1 = (function ($, YAHOO) {
		
		　　　　//...
		
		　　})(jQuery, YAHOO);

	上面的module1模块需要使用jQuery库和YUI库，就把这两个库（其实是两个模块）当作参数输入module1。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

* 匿名闭包函数

		(function(){
			
			var myGrades=[93,95,88,0,55,91];
			
			var average=function(){
				//reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值。
				//语法：arr.reduce(callback,[initialValue])
				//参数
				/*
		callback
		    执行数组中每个值的函数，包含四个参数
		
		    previousValue
		        上一次调用回调返回的值，或者是提供的初始值（initialValue）
		    currentValue
		        数组中当前被处理的元素
		    index
		        当前元素在数组中的索引
		    array
		        调用 reduce 的数组
		
		initialValue
		    作为第一次调用 callback 的第一个参数。 
			*/
				var total=myGrades.reduce(function(accumulator,item){
					return accumulator+item;
				},0);
				
				return 'Your average grade is'+total/myGrades.length+'.';
			}
			/*
			filter() 方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。
			语法：var new_arrary = arr.filter(callback[, thisArg])
			callback
		    用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。
		    返回true表示保留该元素（通过测试），false则不保留。
			*/
			var failing = function(){ 
			
				var failingGrades = myGrades.filter(function(item) {
					return item < 70;
				}); 
				return 'You failed ' + failingGrades.length + ' times.'; 
			} 
			
			console.log(average());
			console.log(failing());
		
			
		})();

	通过这种构造，我们的匿名函数有了自己的作用域或“闭包”。 这允许我们从父（全局）命名空间隐藏变量。

	这种方法的好处在于，你可以在函数内部使用局部变量，而不会意外覆盖同名全局变量

* 全局引用

	另一种比较受欢迎的方法是一些诸如jQuery的库使用的全局引入。和我们刚才举例的匿名闭包函数很相似，只是传入全局变量的方法不同：

#### CommonJS & AMD
* CommonJS


	通过CommonJS，每个JS文件独立地存储它模块的内容（就像一个被括起来的闭包一样）。在这种作用域中，我们通过 module.exports 语句来导出对象为模块，再通过 require 语句来引入。

		function myModule() {
		
			this.hello = function() { 
				return 'hello!'; 
			} 
		
			this.goodbye = function() { 
				return 'goodbye!'; 
			} 
		} 
		
		module.exports = myModule;

	通过指定导出的对象名称，CommonJS模块系统可以识别在其他文件引入这个模块时应该如何解释。


	然后在某个人想要调用 myMoudle 的时候，只需要 require 一下：

		var myModule = require('myModule'); 

		var myModuleInstance = new myModule();
		myModuleInstance.hello(); // 'hello!'
		myModuleInstance.goodbye(); // 'goodbye!'


	这种实现比起模块模式有两点好处：

    避免全局命名空间污染
    明确代码之间的依赖关系

	它在服务器端用起来很爽，可是在浏览器里就不会那么高效了。毕竟读取网络的文件要比本地耗费更多时间。只要它还在读取模块，浏览器载入的页面就会一直卡着不动。（在下一篇第二部分的教程里我们会讨论如何解决这个问题）

* AMD

	CommonJS已经挺不错了，但假使我们想要实现异步加载模块该怎么办？答案就是Asynchronous Module Definition（异步模块定义规范），简称AMD.

	通过AMD载入模块的代码一般这么写：

		define(['myModule', 'myOtherModule'], function(myModule, myOtherModule) {
		  	console.log(myModule.hello());
		});

	这里我们使用 define 方法，第一个参数是依赖的模块，这些模块都会在后台无阻塞地加载，第二个参数则作为加载完毕的回调函数。

	回调函数将会使用载入的模块作为参数。在这个例子里就是 myMoudle 和 myOtherModule.最后，这些模块本身也需要通过 define 关键词来定义。

	拿 myModule 来举个例子：

		define([], function() { 

			return { 
				hello: function() { 
					console.log('hello'); 
				}, 
				goodbye: function() {
					 console.log('goodbye');
				 } 
			}; 
		});

	重申一下，不像CommonJS，AMD是优先浏览器的一种异步载入模块的解决方案。（记得，很多人认为一个个地载入小文件是很低效的，我们将在下一篇文章理介绍如何打包模块）

	除了异步加载以外，AMD的另一个优点是你可以在模块里使用对象、函数、构造函数、字符串、JSON或者别的数据类型，而CommonJS只支持对象。

	再补充一点，AMD不支持Node里的一些诸如 IO,文件系统等其他服务器端的功能。另外语法上写起来也比CommonJS麻烦一些。


#### 具体详情


[Javascript模块化编程（一）:模块写法][1]

[ Javascript模块化编程（二）：AMD规范][2]

[Javascript模块化编程（三）：require.js的用法][3]

[JavaScript 模块化入门Ⅰ：理解模块][4]

[JavaScript 模块化入门Ⅱ：模块打包构建][5]

[1]:http://www.ruanyifeng.com/blog/2012/10/javascript_module.html "Markdown"
[2]:http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html "Markdown"
[3]:http://www.ruanyifeng.com/blog/2012/11/require_js.html "Markdown"
[4]:https://zhuanlan.zhihu.com/p/22890374 "Markdown"
[5]:https://zhuanlan.zhihu.com/p/22945985 "Markdown"












