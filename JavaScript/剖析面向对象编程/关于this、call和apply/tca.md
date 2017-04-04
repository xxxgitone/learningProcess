# this、call和apply
## 1.this
* this的指向，大致可以分为4类

	* 作为对象的方法调用
	* 作为普通函数调用
	* 构造器调用
	* Function.prototype.call和Function.prototype.apply调用


	> 作为对象的方法调用

	当作为对象方法被调用的时候，this指向该对象

		var obj={
			a:1,
			getA:function(){
				alert(this===obj); //true
				alert(this.a);    //1
			}
		}
		
		obj.getA();

	> 作为普通函数调用

	当函数不作为对象的属性被调用时，也就是普通函数，此时this指向全局对象，即window

		window.name='globalName';
		
		var getName=function(){
			return this.name;
		}
		
		console.log(getName());  //globalName

	或者

		window.name='globalName';
		
		var myObject={
			name:'jiang',
			getName: function(){
				return this.name;
			}
		};
		
		var getName=myObject.getName;
		
		console.log(getName());  //globalName

	比如在div节点的事件函数内部，有一个局部的callback方法，callback作为普通函数调用的时候，callback内部的this指向了window

		document.getElementById('div1').onclick=function(){
			alert(this.id);    //div1
			var callback=function(){
				alert(this.id);   //undefined
			}
			
			callback();
		}

	一种简单的解决方法，将this保存起来

		document.getElementById('div1').onclick=function(){
			var that=this;  //保存div的引用
			var callback=function(){
				alert(that.id);   //undefined
			}
			
			callback();
		}

	> 构造器调用

	构造器的外表跟普通函数的几乎一样，它们的区别在于被调用的方式。当用new调用函数时，会返回一个对象，通常情况下，构造器里的this就指向返回的这个对象

		var myClass=function(){
			this.name='jiang';
		}
		
		var obj=new myClass();
		alert(obj.name);   //jiang

	当用new调用构造器的时候，如果构造器里面显示的返回一个object类型的对象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的this

		var myClass=function(){
			this.name='jiang';
			return{  //显示返回一个对象
				name:'zhi',
			}
		}
		
		var obj=new myClass();
		alert(obj.name);  //zhi

	如果构造器里不显示返回一个对象，或者返回一个非对象类型的数值，就不会出现这样的情况

		var myClass=function(){
			this.name='jiang';
			return 'name';  //返回string类型
		} 
		
		var obj=new myClass();
		alert(obj.name);  //jiang

	> Function.prototype.call和Function.prototype.apply调用

	动态改变this

		var obj1={
			name:'jiang',
			getName:function(){
				return this.name;
			}
		}
		
		var obj2={
			name:'zhi',
		}
		
		console.log(obj1.getName());   //jiang 
		console.log(obj1.getName.call(obj2));   //zhi 
* 丢失的this

		var obj={
			name:'jiang',
			getName:function(){
				return this.name;
			}
		}
		
		console.log(obj.getName());  //jiang   作为obj对象的属性调用
		
		var getName2=obj.getName;      //作为普通函数调用
		console.log(getName2());    //undefined

	简化getElementById

		var getId=function(id){
			return document.getElementById(id);
		}
		
		alert(getId('div1'));

	下面方法是否可行？

		var getId=document.getElemntById;
		getId('div1');

	不可行，document.getElemntById方法的内部实现需要this。按照上面方法调用，此时成了普通函数调用。修正this，指向document

		document.getElementById=(function(func){
			return function(){
				return func.apply(document,arguments);
			}
		})(document.getElementById);
		
		var getId=document.getElementById;
		alert(getId('div1'));

## 2.call和apply
* call和apply的区别


	Function.prototype.call和Function.prototype.apply方法作用一样，区别在于传参数不一样

	> apply接受两个参数，第一个参数指定了函数体内this对象的指向，第二个参数为一个带下标的集合，这个集合可以是数组，也可以是类数组，apply方法把这个集合中的元素作为参数传递给被调用的函数

		var func=function(a,b,c){
			alert([a,b,c]);  //1,2,3
		}
		
		func.apply(null,[1,2,3]);

	这段代码，参数1,2,3被放在一个数组中一起传入func函数，它们分别对应func参数列表中的a，b，c

	> call传入的参数数量不固定，跟apply相同的是，第一参数也是代表函数体内this的指向，从第二个参数开始往后，每个参数一次传递

		var func=function(a,b,c){
			alert([a,b,c]);  //1,2,3
		}
		
		func.call(this,1,2,3);

	> 当使用call和apply的时候，如果我们传入的第一个参数为null，函数体内的this会指向默认的宿主对象，在浏览器则是window

		var func=function(a,b,c){
			alert(this);   //[object Window]
		}
		
		func.apply(null,[1,2,3]);

	但如果在ECMAScript5的严格模式下，一个普通函数里的this为undefined，这里函数体内的this仍然为null

		var func=function(a,b,c){
			"use strict"
			alert(this);   //null
			
		}
		
		func.apply(null,[1,2,3]);

	> 有时候我们使用call和apply并不在意this的指向，而是另有用途，比如借用其他对象的方法。

		Math.max.apply(null,[1,2,3,4,5]) //5

* call和apply的用途
	> 改变this指向，最常见的

		var obj1={
			name:'jiang',
		};
		
		var obj2={
			name:'zhi',
		};
		
		window.name='window';
		
		var getName=function(){
			alert(this.name);
		}
		
		getName();    //window
		getName.call(obj1);   //jiang     这里相当于alert(obj1.name);
		getName.call(obj2);    //zhi

	假如一个div节点，div节点的onclick事件中的this本来指向这个的div

		document.getElementById('div1').onclick=function(){
			alert(this.id);  //div1
		}

	假如该事件函数中有一个内部函数func，在事件内部调用func时，func函数中的this指向的是window

		document.getElementById('div1').onclick=function(){
			alert(this.id);  //div1
			var func=function(){
				alert(this.id)  //undefined
			}
			func();
		}

	使用call修改

		document.getElementById('div1').onclick=function(){
			var func=function(){
				alert(this.id)  //div1
			}
			func.call(this);
		}

	> Function.prototype.bind 大部分浏览器都实现了内置的这个方法，用来指定函数内this指向，可以模拟此函数

		Function.prototype.bind=function(context){
			var self=this;     		//保存原函数
			return function(){	//返回一个新的函数
				return self.apply(context,arguments);		//执行新的函数的时候，会把之前传入的context当作新函数体内的this
			}
		};
		
		var obj={
			name:'jiang',
		};
		
		var func=function(){
			alert(this.name);  //jiang
		}.bind(obj);
		
		func();

	实现传参

		Function.prototype.bind=function(){
			var self=this,    		//保存原函数
				context=[].shift.call(arguments), //绑定this上下文
				args=[].slice.call(arguments);//剩余的参数转换为数组
				alert(args);
				alert(context);
			return function(){	//返回一个新的函数
				return self.apply(context,[].concat.call(args,[].slice.call(arguments)));		
				//执行新的函数的时候，会把之前传入的context当作新函数体内的this
				//并且组合两次分别传入的参数，作为新函数的参数
			}
		};
		
		var obj={
			name:'jiang',
		};
		
		var func=function(a,b,c,d){
			alert(this.name);  //jiang
			alert([a,b,c,d]);  //[1,2,3,4]
		}.bind(obj,1,2);
		
		func(3,4);

	> 借用其他对象方法
		var A=function(name){
			this.name=name;
		}
		
		var B=function(){
			A.apply(this,arguments);
		}
		
		B.prototype.getName=function(){
			return this.name;
		}
		
		var b=new B('jiang');
		console.log(b.getName());   //jiang
	借用Array.prototype对象上的方法

		(function(){
			Array.prototype.push.call(arguments,3);
			console.log(arguments);   //[1,2,3]
		})(1,2);






