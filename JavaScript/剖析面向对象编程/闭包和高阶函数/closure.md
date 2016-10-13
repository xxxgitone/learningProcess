#闭包
定义：指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式就是在一个函数内部创建另一个函数。

##1.变量的作用域
* 作用域指的是变量的有效范围
* 在函数中声明一个变量的时候，没有加var，就会变成全局变量
* 在函数中声明一个变量的时候，加了var，就会变成局部变量，只有在该函数内部才能访问
* 当函数搜索一个变量，从内往外

		//例1
		var func=function(){
			var a=1;
			alert(a);//输出1
		}
		func();
		alert(a); //ReferenceError: a is not defined
	
		//例2
		var a=1;
		var func1=function(){
			var b=2;
			var func2=function(){
				var c=3;
				alert(b); //输出2
				alert(a); //输出1
			}
			func2();
			alert(c);//ReferenceError: c is not defined
		}
		func1();

##2.变量的生存周期
* 全局变量的生存周期是永久的，除非我们手动去销毁
* 局部变量，退出函数时，即失去了他们的价值，会随函数调用的结束而被销毁

		var func=function(){
			var a=1;
			return function(){
				a++;
				alert(a);
			}
		}
		var f=func();
		
		f();  //2
		f();  //3
		f();  //4
		f();  //5

	这里跟我们之前的推论相反，当函数退出后，局部变量a并没有消失。因为当执行var f=func();时，f返回了一个匿名函数的引用，它可以访问到func()被调用时产生的环境，而局部变量一直存在这个环境中。

	>闭包的经典应用
	
	页面上有五个div节点，通过循环给每个div绑定onclick事件


		var node=document.getElementsByTagName('div');
		for(var i=0,l=node.length;i<l;i++){
			node[i].onclick=function(){
				alert(i);
			}
		}

	这段代码，无论点击哪个div，最后弹出的都是5，这是因为div节点的onclick事件是被异步触发的，当事件触发的时候，for循环早就结束了。

	解决办法，利用闭包将每次循环的值保存起来

		var node=document.getElementsByTagName('div');
		for(var i=0,l=node.length;i<l;i++){
			//(function(i){
			//	node[i].onclick=function(){
			//		alert(i);
			//	}
			//})(i);

			//或者
			node[i].onclick=(function(i){
				return function(){
					alert(i);
				}
			})(i);
		}

	相同原理的如下代码

		var Type={};
		
		for(var i=0,type;type=['String','Array','Number'][i++];){
			(function(type){
				Type['is'+type]=function(obj){
					return Object.prototype.toString.call(obj)==='[object '+type+']'; //注意空格
				}
			})(type);
		}
		
		alert(Type.isArray([]));
		alert(Type.isString('str'));

##3.闭包的更多作用
* 封装变量 ：闭包可以帮助把一些不需要暴露在全局的变量封装成“私有变量”

	>计算乘积的函数
	* 基本函数

			var mult=function(){
				var a=1;
				for(var i=0,l=arguments.length;i<l;i++){
					a=a*arguments[i];
				}
				return a;
			}
			
			alert(mult(1,2,3));
	* 对于那些相同的参数来说，每次计算是一种浪费，加入缓存机制提高性能

			var cache={};
			
			var mult=function(){
				var args=Array.prototype.join.call(arguments,',');
				alert(args);
				if(cache[args]){
					return cache[args];
				}
				var a=1;
				alert('第二次');   //第二次不会执行
				for(var i=0,l=arguments.length;i<l;i++){
					a=a*arguments[i];
				}
				return cache[args]=a;
			}
			alert(mult(1,2,3));
			alert(mult(1,2,3));

	* 封装全局变量，cache这个变量仅仅在mult中调用

			var mult=(function(){
				var cache={};
				
				return function(){
					var args=Array.prototype.join.call(arguments,',');
					if(cache[args]){
						return cache[args];
					}
					var a=1;
					for(var i=0,l=arguments.length;i<l;i++){
						a=a*arguments[i];
					}
					return cache[args]=a;
				}
			})();
			
			alert(mult(1,2,3));
			alert(mult(1,2,3));

	* 提炼函数是代码重构的一种常见技巧。如果在一个大函数中有一些代码块能够独立出来，我们常常把这些代码块封装成一个小函数，方便复用

			var mult=(function(){
				var cache={};
				
				var calculate=function(){  //封闭calculate函数
					var a=1;
					for(var i=0,l=arguments.length;i<l;i++){
						a=a*arguments[i];
					}
					return a;
				}
			
				return function(){
					var args=Array.prototype.join.call(arguments,',');
					if(cache[args]){
						return cache[args];
					}
					
					return　cache[args]=calculate.apply(null,arguments);
				
				}
			})();
			
			alert(mult(1,2,3));
			alert(mult(1,2,3)); 

* 延迟局部变量的寿命

	> img对象经常用于进行数据上报
	
		var report=function(src){
			var img=new Image();
			img.src=src;
		}

	但是有些浏览器由于版本低，使用report函数进行数据上并不会每一次都成功发起了HTTP请求。丢失数据的原因是img是report的局部变量，函数结束即销毁

		var report=(function(){
			var img=[];
			
			return function(src){
				var img=new Image();
				img.push(img);
				img.src=src;
			}
			
		})();

##4.闭包和面向对象设计
* 跟闭包有关的代码

		var extent=function(){
			var value=0;
			return {
				call:function(){
					value++;
					console.log(value);
				}
			}
		}
		
		var extent=extent();
		
		extent.call(); //1
		extent.call();  //2
		extent.call();  //3
* 换成面向对象的写法

		var extent={
			value:0,
			call:function(){
				this.value++;
				console.log(this.value);
			}
		}
		
		extent.call(); //1
		extent.call();  //2
		extent.call();  //3
* 或者

		var Extent=function(){
			this.value=0;
		}
		
		Extent.prototype.call=function(){
			this.value++;
			console.log(this.value);
		}
		
		var extent=new Extent();
		
		extent.call(); //1
		extent.call();  //2
		extent.call();  //3

##5.用闭包实现命令模式

* 使用面向对象的方式编写一段命令模式

		var Tv={
			open:function(){
				console.log('打开电视机');
			},
			close:function(){
				console.log('关闭电视机');
			}
		}
		
		var OpenTvCommand=function(receiver){
			this.receiver=receiver;
		}
		
		OpenTvCommand.prototype.execute=function(){
			this.receiver.open();    //执行命令，打开电视机
		}
		
		OpenTvCommand.prototype.undo=function(){
			this.receiver.close();  	//撤销命令，关闭电视机
		}
		
		var setCommand=function(command){
			document.getElementById('execute').onclick=function(){
				command.execute();  	//输出：打开电视机
			}
			document.getElementById('undo').onclick=function(){
				command.undo();  	//输出：关闭电视机
			}
		}
		setCommand(new OpenTvCommand(Tv));

* 使用闭包

		var Tv={
			open:function(){
				console.log('打开电视机');
			},
			close:function(){
				console.log('关闭电视机');
			}
		}
		
		var createCommand=function(receiver){
			var execute=function(){
				return receiver.open();    //执行命令，打开电视机
			}
			
			var undo=function(){
				return receiver.close();   //撤销命令，关闭电视机
			}
			
			return{
				execute:execute,
				undo:undo
			}
		}
		
		var setCommand=function(command){
			document.getElementById('execute').onclick=function(){
				command.execute();  	//输出：打开电视机
			}
			document.getElementById('undo').onclick=function(){
				command.undo();  	//输出：关闭电视机
			}
		}
		setCommand(createCommand(Tv));





