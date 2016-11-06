//定义子类
//JavaScript的对象可以从类的原型对象中继承（通常继承的是方法）。如果哦o是类B的实例，B是A的子类，
//那么O也一定从A继承了属性。为此首先要确保B的原型对象继承自A的原型对象

// B.prototype=inherit(A.prototype);
// B.prototype.constructor=B;

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


function extend(o, p) {
	for (prop in p) {
		o[prop] = p[prop];
	}
	return o;
}
//这里展示了不使用defineSubclass函数“手动”实现子类
//singletonSet是一个特殊的集合，它是只读的，二且包含单独的常量成员
function SingletonSet(member) {
	this.member = member; //记住集合中唯一的成员
}

//创建一个原型对象，这个原型对象继承自Set的原型
SingletonSet.prototype = inherit(Set.prototype);

//给原型添加属性
//如果有同名的属性就覆盖Set.prototype中的同名属性
extend(SingletonSet.prototype, {
	//设置合适的constructor属性
	constructor: SingletonSet,
	//这个集合是只读的，所以调用add和remove都会报错
	add: function() {
		throw 'read-only';
	},
	remove: function() {
		throw 'read-only';
	},
	//SingletonSet的实例总永远只有一个元素
	size: function() {
		return 1;
	},
	//这个方法只调用一次，传入这个集合的唯一成员
	foreach: function(f, context) {
		f.call(context, this.member);
	},
	//contains方法非常简单，只需检查传入的值是否匹配这个集合唯一的成员即可
	contains: functon(x) {
		return x === this.member;
	}
})

//SingletonSet定义自己的equals
SingletonSet.prototype.equals = function(that) {
	return that instanceof Set && that.size == 1 && that.contains(member);
}

//构造函数和方法链

//SingletonSet类定义了全新的集合实现，而且将它继承自其父类的核心方法全部替换
//然而定义子类时，我们往往希望对父类的行为进行修改或者扩充
//为了做到这一点，构造函数和子类的方法需要调用或链接到父类的构造函数和父类方法

//NonNullSet是Set的子集，它不允许null和undefined作为它的成员

//为了使用这种方式对成员做限制，NonNullSet需要在其add方法中对null和undefined值做检测
//但它需要完全重新实现一个add方法，因此需要调用父类中的这个方法
//NonNullSet构造函数同样不需要重新实现，它只需将它的参数传入父类构造函数（作为函数来调用它，而不是通过构造函数来调用）
//通过父类的构造函数来初始化新创建的对象

//在子类中调用父类的构造函数和方法
function NonNullSet() {
	//仅链接到父类
	//作为普通函数调用父类的构造函数来初始化通过该构造函数调用创建对象
	Set.apply(this, arguments);
}
//将NonNullSet设置成Set的子类
NonNullSet.prototype = inherit(Set.prototype);
NonNullSet.prototype.constructor = NonNullSet;

//为了将null和undefined排除在外，只需重写add方法
NonNullSet.prototype.add = function() {
	//检查参数是不是null和undefined
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] == null)
			throw new Error("Can't add null or undefined to a NonNullSet");

		//调用父类的add方法执行实际插入操作
		return Set.prototype.add.apply(this, arguments);
	}
}

//将这个非null集合的概念推而广之，称为“过滤后的集合”，这个集合中的成员必须首先传入一个过滤函数在
//执行添加操作。
//定义一个类工厂函数，传入一个过滤函数，返回一个新的Set类

//使用方法
//定义一个只能保存字符串的“集合”类,
var StringSet = filteredSetSubclass(Set, function(x) {
		return typeof x === 'string';
	})
	//这个集合类成员不能是null和undefined或者函数
var MySet = filteredSetSubclass(NonNullSet, function(x) {
	return typeof x !== 'function';
});

//类工厂和方法类
/**
 * 这个函数返回具体的Set类的子类
 * 并重写该类的add方法用以添加的元素做特殊的过滤
 */
function filteredSetSubclass(superclass, filter) {
	var constructor = function() { //子类构造函数
		superclass.apply(this, arguments); //调用父类构造函数
	};
	var proto = constructor.prototype = inherit(superclass.prototype);
	proto.constructor = constructor;
	proto.add = function() {
		for (var i = 0; i < arguments.length; i++) {
			var v = arguments[i];
			if (!filter(v)) throw ("value" + v + " rejected by filter");
		}
		//调用父类的add方法
		superclass.prototype.add.apply(this, arguments);
	}
	return constructor;
}

//使用包装函数和Function.prototype.extend方法来冲重写NonNullSet
var NonNullSet = (functon() {
			var superclass = Set; //定义并立即调用这个函数
			return superclass.extend(function() {
					superclass.apply(this, arguments);
				}, {
					add: function() {
						for (var i = 0; i < arguments.length; i++) {
							if (arguments[i] == null)
								throw new Error("Can't add null or undefined to a NonNullSet");

							//调用父类的add方法执行实际插入操作
							return Set.prototype.add.apply(this, arguments);
						}
					});
			}());

//组合vs子类
//这种方法更好的实现了上面的功能，这是面向对象编程中一条广为人知的设计原则‘组合由于继承’

/**
 * 实现一个FilterSet，它包装某个指定集合对象
 * 并对传入的add方法的值引用了某种特定的过滤器
 * 范围类中其他方法的核心方法延续到包装后的实例
 */
var FilteredSet=Set.extend(
	function FilteredSet(set,filter){//构造函数
		this.set=set;
		this.filter=filter;
	},{
		add:function(){
			//如果有过滤器，则直接使用
			if(this.filter){
				for(var i=0;i<arguments.length;i++){
					var v=arguments[i];
					if(!this.filter(v))
						throw new Error('FilteredSet:value'+v+' rejected by filter');
				}
			}
			//调用set的方法
			this.set.add.apply(this.set,arguments);
			return this;
		},
		//其他方法不变
		remove:function(){
			this.set.remove.apply(this.set,arguments);
			return this;
		},
		contains:function(v){return this.set.contains(v);}
		size:function(){return this.set.size();}
		foreach:function(f,c){return this.set.foreach(f,c);}
	})
//在上面上个那个例子的好处就是，只需要创建一个单独的FilteredSet子类即可

var s=new FilteredSet(new Set(),function(x){return x!==null;})

//还可以对已经过滤后的集合进行过滤
var t=new FilteredSet(new Set(),function(x){return !(x instanceof Set);})