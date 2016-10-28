//1.创建类
// var Person=function(name){
// 	this.name=name;
// }

//实例化一个Person
//var alice=new Person('alice');

//检查这个实例
//assert(alice instanceof Person);

//alert(Person('bob'));  //undefined


//创建类模拟库
// var Class=function(){
// 	var klass=function(){
// 		this.init.apply(this,arguments);
// 	};
// 	klass.prototype.init=function(){};
// 	return klass;
// }

//var Person=new Class();

//Person.prototype.init=function(){
	//基于Person的实例做初始化
//}

//用法
//var person=new Person();

//2.给类添加函数

//在构造函数中给类添加函数和给对象添加属性是一样的

//Person.find=function(id){/*...*/};

//var person=Person.find(1);

//要想给构造函数添加实例函数，则需要用到构造函数的prototype

//Person.prototype.breath=function(){/*...*/};

//var person=new Person();

//person.breath();

//一种常用模式是
//Person.fn=Person.prototype;
//Person.fn.run=function(){/*...*/};


//3.给类库添加方法

//直接给类设置属性和设置其静态成员是等价的

//var Person=new Class();

//直接给类添加静态方法
//Person.find=function(id){/*...*/};

//直接调用

//var person=Person.find(1);

//给类的原型设置的属性在类的实例中也是可用的

// var Person=new Class();
// Person.prototype.save=function(){/*...*/};

// var person=new Person();
// person.save();

//封装两个方法用于添加静态方法和实例的属性

var Class=function(){
	var klass=function(){
		this.init.apply(this,arguments);
	};
	klass.prototype.init=function(){};

	//定义prototype的别名
	klass.fn=klass.prototype;

	//定义类的别名
	klass.fn.parent=klass;

	

	return klass;
}

