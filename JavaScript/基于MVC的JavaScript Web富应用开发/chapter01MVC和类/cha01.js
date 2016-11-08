//1.创建类

var Person = function(name) {
		this.name = name;
	}
	//实例化一个Person，new 运算符改变了函数的执行上下文，同时也改变了return语句的行为
var alice = new Person('alice');
console.log(alice);
assert(alice instanceof Person);

console.log(Person('alice')); //undefined，此时执行的上下文是window（全局）对象
//无意创建了一个全局name
//当使用new关键字来调用构造函数时，执行的上下文从全局对象（window）变成了一个空的上下文
//这个上下文代表了新生成的实例。因此this关键字指向当前创建的实例


//默认情况下，如果你得构造函数没有返回内容，就会返回this--当前的上下文


//2.创建类模拟库
var Class = function() {
	var klass = function() {
		this.init.apply(this, arguments);
	}
	klass.prototype.init = function() {};
	return klass;
}

var Person = new Class;

Person.prototype.init = function() {
	//基于Person的实例做初始化
}

//用法
var person = new Person;

//给类添加函数
//在构造函数中给类添加函数和给对象添加属性是一模一样的
Person.find = function(id) { /*...*/ };

//var person=Person.find(1);

//要想给构造函数添加实例函数，则需要用到构造函数的prototype
Person.prototype.breath = function() { /*...*/ };

var person = new Person;
person.breath();

//一种常用的模式是给类的prototype起一个别名fn
Person.fn = Person.prototype;

Person.fn.run = function() { /*...*/ };

//3.给类库添加方法
//定义两个函数extend和inclued分别用于类添加静态属性和实例方法
var Class = function() {
	var klass = function() {
		this.init.apply(this, arguments);
	}
	klass.prototype.init = function() {};

	//定义prototype的别名
	klass.fn = klass.prototype;

	//定义类的别名
	klass.fn.parent = klass;

	//给类添加属性
	klass.extend = function(obj) {
		var extended = obj.extended; //支持回调
		for (var i in obj) {
			klass[i] = obj[i];
		}
		if (extended) extended(klass);
	}

	//给实例添加属性
	klass.include = function(obj) {
		var included = obj.included;
		for (var i in obj) {
			klass.fn[i] = obj[i];
		}
		if (included) extended(klass); //支持回调
	}

	return klass;
}

var Person = new Class;

//添加属性方法
Person.extend({
	find: function(id) { /*...*/ },
	exists: function(id) { /*...*/ },
})

//var person=Person.find(1);

// 添加实例方法
Person.include({
	save: function(id) { /*...*/ },
	destroy: function(id) { /*...*/ },
})

// var person=new Person;
// person.save();

//这里实现了extended和included回调。将属性传入对象之后就会触发这两个函数

Person.extend({
	extended: function(klass) {
		console.log(klass, ' was extended');
	}
})

//重用模块
var ORMModule = {
	save: function(id) { /*...*/ },
}

// var Person=new Class;
// var Asset=new Class;

// Person.include(ORMModule);
// Asset.include(ORMModule);



//4.基于原型的继承
//JavaScript是基于原型的编程语言，原型用来区别类和实例。原型是一个‘模板’对象
//它上面的属性被用作初始胡一个新对象，任何对象都可以作为另一个对象的原型对象
//以此来共享。实际想可以理解为某种 形式的继承

//当读取一个对象属性的时候，JavaScript首先会在本地对象中查找这个属性，如果没有找到，JavaScript开始在
//对象的原型中查找，若仍未找到还会继续查找原型的原型，直到找到Object.prototype
//换句话说，如果你给Array.prototype添加了属性，那么所有的JavaScript数组都具有了这些属性

/*
var Animal=function(){};

Animal.prototype.breath=function(){
	console.log('breath');
}

var Dog=function(){};

Dog.prototype = new Animal;

Dog.prototype.wag=function(){
	console.log('wag');
}

var dog=new Dog();
dog.wag();
dog.breath(); //继承属性
*/

//5.给类库添加继承

var Class = function(parent) {
	var klass = function() {
		this.init.apply(this, arguments);
	}

	//改变klassde 的原型
	if (parent) {
		var subclass = function() {};
		subclass.prototype = parent.prototype;
		klass.prototype = new subclass;
	}

	klass.prototype.init = function() {};

	//定义prototype的别名
	klass.fn = klass.prototype;

	//定义类的别名
	klass.fn.parent = klass;

	//给类添加属性
	klass.extend = function(obj) {
		var extended = obj.extended; //支持回调
		for (var i in obj) {
			klass[i] = obj[i];
		}
		if (extended) extended(klass);
	}

	//给实例添加属性
	klass.include = function(obj) {
		var included = obj.included;
		for (var i in obj) {
			klass.fn[i] = obj[i];
		}
		if (included) extended(klass); //支持回调
	}

	return klass;

}

//如果将parent传入Class构造函数，那么所有的子类则必然共享一个原型
//这种创建临时匿名函数的小技巧避免了早在继承类的时候创建实例，这里按时了只有实例属性
//才能被继承

// var Animal=new Class();
// Animal.include({
// 	breath:function(){
// 		console.log('breath');
// 	}
// })

// var Cat=new Class(Animal);

// var tommy=new Cat();
// tommy.breath(); //breath

//函数调用，apply和call函数的使用

var clicky = {
	wasClicked: function() {
		/*...*/
	}

		addListener: function() {
		var self = this; //将this绑定
		$('.clicky').click(function() {
			self.wasClicked()
		});
	}
}

//可以使用apply是代码变得干净
var proxy = function(func, thisObject) {
	return (function() {
		return func.apply(thisObject, arguments);
	})
}

var clicky = {
	wasClicked: function() {
		/*...*/
	}

		addListener: function() {
		$('.clicky').click(proxy(this.wasClicked, this));
	}
}

//jquery包含了实现这个功能的api
$('.clicky').click($.proxy(function() { /*...*/ }, this))

//6.控制类库的作用域

var Class = function(parent) {
	var klass = function() {
		this.init.apply(this, arguments);
	}

	//改变klassde 的原型
	if (parent) {
		var subclass = function() {};
		subclass.prototype = parent.prototype;
		klass.prototype = new subclass;
	}

	klass.prototype.init = function() {};

	//定义prototype的别名
	klass.fn = klass.prototype;

	//定义类的别名
	klass.fn.parent = klass;

	//添加一个proxy函数
	klass.proxy = function(func) {
		var self = this;
		return (function() {
			func.apply(self, arguments);
		})
	}

	//在实例中也添加这个方法
	klass.fn.proxy = klass.proxy;

	//给类添加属性
	klass.extend = function(obj) {
		var extended = obj.extended; //支持回调
		for (var i in obj) {
			klass[i] = obj[i];
		}
		if (extended) extended(klass);
	}

	//给实例添加属性
	klass.include = function(obj) {
		var included = obj.included;
		for (var i in obj) {
			klass.fn[i] = obj[i];
		}
		if (included) extended(klass); //支持回调
	}

	return klass;

}

//使用proxy函数来包装函数，以确保他们在正确的作用域被调用
var Button = new Class();

Button.include({
	init: function(element) {
		this.element = jQuery(element);

		this.element.click(this.proxy(this.click));
	}

		click: function() { /*...*/ }
})

//ES5中的bind方法
Button.include({
	init: function(element) {
		this.element = jQuery(element);

		this.element.click(this.click.bind(this));
	}

	click: function() { /*...*/ }
})

//7.添加私有函数
//利用匿名函数来创建私有属性

var Person = function() {};

(function() {
	var findById = function() { /*...*/ };

	Person.find=function(id){
		if(typeof id=='integer')
			return findById(id);
	}

})()

//定义变量的时候不要丢掉var运算符，如果丢掉了就变成了全局变量了
//使用下面方法定义全局变量

(function(exports){
	var foo='bar';

	exports.foo=foo;
})(window)


