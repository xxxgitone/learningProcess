//定义了一个扩展函数，用来将第二个以及后续参数复制至第一个参数
//这里处理了IE的bug：在多数IE版本中
//如果o的属性拥有一个不可枚举的同名属性，则for/in循环
//不会枚举对象的o的可枚举对象，也就是说，将不会正确的处理诸如toString的属性，除非我们显示检测它
var extend = (function() {
	//在修复它之前，检测是否含有bug
	for (var p in {
			toString: null
		}) {
		//如果代码执行到这里，那么for/in循环会正确工作并返回
		//一个简单版本的extend函数
		return function extend(o) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];
				for (var prop in source) o[prop] = source[prop];
			}
			return o;
		};
	}
	//如果代码执行到这里，说明for/in循环不会枚举测试对象的toString属性
	//因此返回另一个版本的extend函数，这个函数会显示测试Object.prototype中的不可枚举的属性
	return function patched_extend(o) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			//复制所有属性
			for (var prop in source) o[prop] = source[prop];

			//检查特殊属性
			for (var j = 0; j < protoprops.length; j++) {
				prop = protoprops[j];
				if (source.hasOwnProperty(prop))
					o[prop] = source[prop];
			}
		}
		return o;
	};

	//这个列表列出了需要检查的特殊属性
	var protoprops = ['toString', 'valueOf', 'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString'];
}());

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

//定义子类
/**
 * 用一个简单的函数创建简单的子类
 * @param  {Function} superClass  父类的构造函数
 * @param  {Object} constructor 新的子类构造函数
 * @param  {Object} methods     实例方法：复制至原型中
 * @param  {Object} statics     类属性：复制至构造函数中
 * @return {[type]}             [description]
 *
 * B.prototype=inherit(A.prototype);
 * B.prototype.constructor=B;
 */
function defineSubClass(superClass, constructor, methods, statics) {
	//创建子类的原型对象
	constructor.prototype = inherit(superClass.prototype);
	constructor.prototype.constructor = constructor;
	//像对常规类一样复制方法和属性
	if (methods) extend(constructor.prototype, methods);
	if (static) extend(constructor, statics);
	return constructor;
}

//也可以通过父类构造函数的方法来做到这一点
Function.prototype.extend = function(constructor, methods, statics) {
	return defineSubClass(this, constructor, methods, statics);
}




//这个函数可以用作任何抽象方法，非常方便
function abstractmethod() {
	throw new Error('abstract method');
}

//定义了一个抽象方法contains
function AbstractSet() {
	throw new Error("Can't instantiate abstract classes");
}
AbstractSet.prototype.contains = abstractmethod;

/**
 * NotSet是AbstractSet的一个非抽象子类
 * 所有不在其他集合中的成员都在这个集合中
 * 因为它是在其他集合是不可写的条件下定义的
 * 同时由于它的成员是无限个，因此它是不可枚举的
 * 我们只能用它来检测元素成员的归属情况
 * 这里使用Function.prototype.extend来定义这个子类
 */
var Noset=AbstractSet.extend(function Noset(set){this.set=set},{
	contains:function(x){
		return !this.set.contains(x);
	},
	toString:function(x){
		return '~'+this.set.toString();
	},
	equals:function(that){
		return that instanceof NotSet&&this.set.equals(that.set);
	}
});





