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

