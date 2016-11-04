/**
 * 通过原型继承创建一个新对象，使用ECMAScript5中的Object.create方法
 * 如果不支持，则退化使用其他方法
 * @param  {Object} p 将要继承的对象
 * @return Object   继承自原型对象p的属性的新对象
 */
function inherit(p) {
	if (p == null) throw TypeError(); //p是一个对象，但不能为null
	if (Object.create) //是否支持Object.create
		return Object.create(p);
	var t = typeof p;
	if (t !== 'Object' && t !== 'function') throw TypeError();

	function f() {}; //定义一个空函数
	f.prototype = p; //将其原型属性设置为p
	return new f(); //使用f()创建p的继承对象
}
/*
//类和原型
//一个简单的JavaScript类，实现一个能表示值范围的类

//这个工厂方法返回一个新的范围对象
function range(from, to) {
	//使用inherit函数来创建对象，这个对象继承自在下面定义的原型对象
	//原型对象作为函数的一个属性存储，并定义所有‘范围对象’所共享的方法
	var r = inherit(range.methods);

	//存储新的“范围对象”的起始位置和结束位置
	//这两个属性是不可继承的，每个对象都拥有唯一的属性
	r.from = from;
	r.to = to;

	//返回这个新创建的对象
	return r;
}

//原型对象定义方法，这些方法为每个范围对象所继承
range.methods = {
	//如果x在范围内，则返回true，否则为fals
	//这个方法可以比较数字范围，也可以比较字符串和日期范围
	includes: function(x) {
		return this.from <= x && x <= this.to;
	},

	//对于范围内，每个整数都调用一次f
	//这个方法只能用作数字
	foreach:function(f){
		for(var x=Math.ceil(this.from);x<=this.to;x++) f(x);
	},

	//返回这个范围的字符串
	toString:function(){
		return "("+this.from+"..."+this.to+")";
	}
};

var r=range(1,3);  //创建一个范围
r.includes(2);			//true
r.foreach(console.log); //输出1,2,3
console.log(r);		//输出对象from:1,to:3,foreach:function(f).....
	
*/

//重写上面方法
//类和构造函数 常用

/**
 * 这是一个构造函数，用以初始化新创建的‘范围对象’
 * 注意，这里并没有创建并返回一个对象，仅仅是初始化
 * 构造函数就是用来‘构造新对象’
 * @constructor
 */
function Range(from, to) {
	this.from = from;
	this.to = to;
}

Range.prototype = {//这样W为重写原型，这样不包含constructor属性
	constructor:Range,//指定原型，或者使用Range.prototype.includes=function(){/*....*/},依依添加方法
	includes: function(x) {
		return this.from <= x && x <= this.to;
	},
	foreach: function(f) {
		for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
	},
	toString: function() {
		return "(" + this.from + "..." + this.to + ")";
	}
}

//Range.prototype.constructo=Range;

//添加一个比较方法
//一个Range对象和其他不适Range的对象均不相等
//当且仅当两个范围的端点相等，他们才相等
Range.prototype.equals=function (that) {
	if(that==null) return false;  //处理null和undefined
	if(that.constructor!=Range) return false;//处理非Range对象
	return this.from=that.from&&this.to=that.to;
}

var r=new Range(1,3);  //创建一个范围
console.log(r.includes(2));			//true
r.foreach(console.log); //输出1,2,3
console.log(r);		//输出对象from:1,to:3,foreach:function(f).....