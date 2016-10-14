#this、call和apply
##1.this
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

	一种接单的解决方法，将this保存起来

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

##2.call和apply
* call和apply的区别


	Function.prototype.call和Function.prototype.apply方法作用一样，区别在于传参数不一样
