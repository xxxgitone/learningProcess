//集合类：值得任意集合，集合set是一种数据结构，用以表示非重复的无序集合

//这个Set类，它实现了从JavaScript值到唯一字符串的映射，然后将字符串用作属性名
//对象和函数都不具备如此简明可靠地唯一字符串表示，因此集合类必须给集合中的每一
//个对象或者函数定义一个唯一的属性标识

//构造函数
function Set() {
	this.values = {}; //集合数据保存在对象的属性里
	this.n = 0; //集合中的个数
	this.add.apply(this, arguments); //把所有参数都添加进这个集合
}

//将每个参数都添加至集合中
Set.prototype.add = function() {
	for (var i = 0; i < arguments.length; i++) { //遍历每个参数
		var val = arguments[i]; //添加到集合中的值
		var str = Set._v2s(val); //把它转换为字符串
		if (!this.values.hasOwnProperty(str)) { //如果不在集合中
			this.values[str] = val; //将字符串和值对应起来
			this.n++; //集合中值得计数加一
		}
	}
	return this; //支持链式
};

//从集合中删除元素，这些元素由参数指定
Set.prototype.remove = function() {
	for (var i = 0; i < arguments.length; i++) { //遍历每个参数
		var str = Set._v2s(arguments[i]); //将字符串和值对应起来
		if (this.values.hasOwnProperty(str)) { //如果在集合中
			delete this.values[str]; //删除
			this.n--; //计数减一
		}
	}
	return this;
};

//如果集合包含这个值，则返回true，否则返回false
Set.prototype.contains = function(value) {
	return this.values.hasOwnProperty(Set._v2s(value));
};

//返回集合大小
Set.prototype.size = function() {
	return this.n;
};

//遍历集合中的所有元素，在指定的上下文中调用f
Set.prototype.foreach = function(f, context) {
	for (var s in this.values) //遍历集合中的所有字符串
		if (this.values.hasOwnProperty(s)) //忽略继承的属性
			f.call(context, this.values[s]); //调用f，传入value
};



//这是一个内部函数，用以将任意的JavaScript值和唯一的字符串对应起来
Set._v2s = function(val) {
	switch (val) {
		case undefined:
			return 'u'; //特殊的原始值
		case null:
			return 'n';
		case true:
			return 't';
		case fals:
			return 'f';
		default:
			switch (typeof val) {
				case 'number':
					return '#' + val; //数字都带有‘#’前缀
				case 'string':
					return '"' + val;
				default:
					return '@' + objectId(val); //对象和函数带有‘@’
			}
	}

	//对任意对象来说，都会返回一个字符串
	//针对不同的对象，这个函数会返回不同的字符串
	//针对同一个对象多次调用，总是返回相同的字符串
	//为了做到这一点，它给o创建了一个属性，在es5中，这个属性是不可枚举的且是只读的
	function objectId(o) {
		var prop = '|**objectid**|'; //私有属性,用以存放id
		if (!o.hasOwnProperty(prop)) //如果对象没有ID
			o[prop] = Set._v2s.next++; //将下一个值赋给它
		return o[prop]; //返回这个ID
	}
};

Set._v2s.next = 100; //设置初始id的值

/**
 * 把p中可枚举的属性复制到o中，并返回o
 * 如果o和p中含有同名属性，则覆盖o中
 *这个函数并不处理getter和setter
 */

function extend(o, p) {
	for (prop in p) {
		o[prop] = p[prop];
	}
	return o;
}

//给set函数添加标准转换方法
extend(Set.prototype, {
	//将集合转换为字符串
	toString:functon(){
		var s='{',
		i=0;
		this.foreach(function(v){
			s+=((i++>0)?',':' '+v)
		});
		return s+'}';
	},
	//类似toString方法，但是对于所有的值都将调用toLocaleString()
	toLocaleString:function(){
		var s='{',
		i=0;
		this.foreach(function(v){
			if(i++>0) s+=',';
			if(v=null) s+=v; //null和undefined
			else s+=v.toLocaleString();
		});
		return s+'}';
	},
	toArray:function(){
		var a=[];
		this.foreach(function(v){
			a.push(v);
		})
		return a;
	}
})

//对于要从JSON转换为字符串的集合都被当做数组来对待
Set.prototype.toJSON = Set.prototype.toArray;

Set.prototype.equales = function(that) {
	// 一些次要情况的处理
	if(this===that) return true;

	//如果that对象不适一个集合，它和this不相等
	//我们用到了instanceof，使得这个方法可以用于set的任何子集
	//null和undefined两个值无法用instanceof运算的
	if(!(that instanceof Set)) return false;

	//长度不相等
	if(this.size()!=that.size()) return false;

	//检查集合中的元素是否一样
	//如果两个集合不相等，则通过抛出异常终止foreeach循环
	try{
		this.foreach(function(v){
			if(!that.contains(v)) throw false;
		})
		return true;  //所有的元素都匹配：两个集合相等
	}catch(x){
		if(x===false) return false;  //如果集合中有元素在另外一个集合中不存在
		throw x;//重新抛出异常
	}
};



