//ECMAScript5给属性增加了方法支持（getter，setter，可枚举性，可写性和可配置性）

//让属性不可枚举
//
//将代码包装到一个匿名函数中，这样定义的变量就在这个函数作用域内
(function(){
	//定义一个不可枚举的属性objectId，它可以被所有对象继承
	//当读取这个属性时调用getter函数
	//没有定义setter，因此是只读的
	//它是不可配置的，因此不能删除
	Object.defineProperty(Object.prototype,'objectId',{
		get:idGetter,//取值器
		enumeration:false,//不可枚举
		configurable:false,//不可删除
	});

	//当读取objectId的时候直接调用这个getter函数
	function idGetter() {
		if(!(idprop in this)){//如果对象中不存在id
			if(!Object.isExtensible(this))//并且可以增加属性
				throw Error("Can't define id for nonrextendsible objects");
			Object.defineProperty(this,idprop,{//给它一个值
				value:nextid++,
				writable:false,
				enumeration:false,
				configurable:false
			});
		}
		return this[idprop];//返回已有的或新的
	}
	//idGetter用到了这些变量，这些都属于私有属性
	var idprop="|**objectId**|";//假设这个属性没有用到
	var nextid=1;//设置初值
}())

//定义不可变的类
//创建一个不可变的类，它的属性和方法都是只读的

//这个方法可以使用new调用，也可以省略new，它可以用构造函数也可以用作工厂函数
function Range(from,to){
	//这些是对from和to只读属性的描述符
	var props={
		from:{value:from,enumeration:true,writable:false,configurable:false}
		to:{value:to,enumeration:true,writable:false,configurable:false}
	}

	if(this instanceof Range){//如果作为构造函数来调用
		Object.defineProperties(this,props);//定义属性
	}else{//否则作为工厂方法来调用
		return Object.create(Range.prototype,props);//创建并返回这个新Range对象。属性由props来定
	}
}

//如果用同样的方法给Range.prototype对象添加性
//那么我们需要给这些属性设置它们的特性
//因为我们无法识别出它们的可枚举性、可写性或可配置性，这些属性特性默认值都是false
Object.defineProperties(Range.prototype,{
	includes: function(x) {
		return this.from <= x && x <= this.to;
	},
	foreach: function(f) {
		for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
	},
	toString: function() {
		return "(" + this.from + "..." + this.to + ")";
	}
})
//利用Object.create和Object.defineProperties来定义不可变的和不可枚举的属性
//这两个方法非常强大，但属性描述符对象让代码的可读性变得很差
//另一种改进的做法是将修改这个已定义属性的特性的操作定义为一个工作函数

// 属性描述工具函数

//将o的指定名字(或所有)的属性设置为不可写的和不可配置的
function freezeProps(o){
	var props=(arguments.lenght==1)?Object.getOwnPropertyNames(o)//如果只有一个参数，使用所有的属性
									:Array.prototype.splice.call(arguments,1);//否则传入指定名字的属性
	props.forEach(function(n){//将它们设置为只读和不可变的
		if(!Object.getOwnPropertyDescriptor(o,n).configurable) return;//忽略不可配置的
		Object.defineProperty(o,n,{writable:false,configurable:false});
	});
	return o;
}

//将o指定名字（或所有）的属性设置为不可枚举的和可配置的
function hideProps(o){
	var props=(arguments.lenght==1)?Object.getOwnPropertyNames(o)//如果只有一个参数，使用所有的属性
									:Array.prototype.splice.call(arguments,1);//否则传入指定名字的属性
	props.forEach(function(n){//将它们设置为不可枚举的
		if(!Object.getOwnPropertyDescriptor(o,n).configurable) return;//忽略不可配置的
		Object.defineProperty(o,n,{enumeration:false});
	});
	return o;
}

//使用
function Range(from,to){//不可变的类Range的构造函数
	this.from=from;
	this.to=to;
	freezeProps(this);//将属性设置为不可变的
}

Range.prototype=hideProps({//使用不可枚举的属性来定义原型
	constructor:Range,
	includes: function(x) {
		return this.from <= x && x <= this.to;
	},
	foreach: function(f) {
		for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
	},
	toString: function() {
		return "(" + this.from + "..." + this.to + ")";
	}
})


//封装对象状态
//通过定义属性getter和setter方法将状态变量更加健壮地封装起来，这两个方法无法删除

//将Range类的端点严格封装起来
//这个版本的Range是可变的，但将端点变量进行良好的封装
//但端点的大小顺序还是固定的from<=to

function Range(from,to){
	if(from>to)
		throw new Error('Range:from must be <=to');
	//定义存取器的方法维持不变
	function getFrom(){return from;}
	function getTo(){return to;}
	function setFrom(f){
		if(t<to) from=f;
		else throw new Error('Range:from must be <=to');
	}
	function setTo(t){
		if(t>=from) to=t;
		else throw new Error('Range:to must be >=from');
	}

	//将使用取值器的属性设置为可以枚举，不可配置
	Object.defineProperties(this,{
		from:{get:getFrom,set:setFrom,enumeration:true,configurable:false}
		to:{get:getTo,set:setTo,value:to,enumeration:true,configurable:false}
	})

}

//和前面的例子相比，原型对象没有做任何修改
//实例方法可以像读取普通的属性一样读取from和to
Range.prototype=hideProps({
	constructor:Range,
	includes: function(x) {
		return this.from <= x && x <= this.to;
	},
	foreach: function(f) {
		for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
	},
	toString: function() {
		return "(" + this.from + "..." + this.to + ")";
	}
})

//防止类的扩展
Object.preventExtensions();//可以将对象设置为不可扩展的
Object.seal();//除了能阻止用户给对象添加新属性，还能将当前已有的属性设置为不可配置，这样就不能删除
            //但不可配置的属性可以是可写的，也可以转换为只读属性
Object.freeze();//和seal功能一样





