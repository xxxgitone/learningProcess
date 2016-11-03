/**
 * 这个文件定义了Complex类，用来描述复数
 * 复数是实数和虚数的和，并且虚数i是-1的平方根
 */

/**
 * 这个构造函数为它所创建的每个实例定义了实例字段r和i
 * 分别保存复数的实部和虚部
 * 它们是对象状态
 * @param {Number} real      实部
 * @param {Number} imaginary 虚部
 */
function Complex(real,imaginary){
	if (isNaN(real)||isNaN(imaginary)) return new TypeError();
	this.r=real;
	this.i=imaginary;
}

/**
 * 类的实例方法定义为原型对象的函数属性
 * 这里定义的方法可以被所有实例继承，并为它们提供共享的行为
 * 需要注意的是JavaScript的实例方法必须使用关键字this来存取实例的字段
 */

//当复数对象加上另一个复数，并返回一个新的计算和值后的复数对象
Complex.prototype.add = function(that) {
	return new Complex(this.r+that.r,this.i+that.i);
};

//当辅助乘以另外一个复数，并返回一个新的计算乘积之后的复数对象
Complex.prototype.mul=function(that){
	return new Complex(this.r*that.r-this.i*that.i,this.r*that.i+this.i*that.r);
}

//计算复数的模，复数的模定义为原点（0,0）到复平面的距离
Complex.prototype.mag=function(){
	return Math.sqrt(this.r*this.r+this.i*this.i);
}

//复数的求负运算
Complex.prototype.neg = function() {
	return new Complex(-this.r,-this.i);
};

//将一个复数转换为一个字符串
Complex.prototype.toString = function() {
	return '{'+this.r+','+this.i+'}';
};

//检测当前复数对象是否和另一个复数相等
Complex.prototype.equals = function(that) {
	return that!=null&&that.constructor===Complex
				&&this.r===that.r&&this.i===that.i;
};

/**
 * 类字段（比如常量）和类方法直接定义为构造函数的属性
 * 需要注意的是，类方法通常不适用this关键字
 * 它们只对其参数进行操作
 */

//这里预定义了一些对复数运算有帮助的类字段
//它们的名字为大写，说明它们是常量
//（在ECMAScript中，还能设置这些字段的属性为只读）

Complex.ZERO= new Complex(0,0);
Complex.ONE=new Complex(1,0);
Complex.I=new Complex(0,1);

//这个类方法将由实例对象的toString方法返回的字符串格式解析为一个Complex对象
//或者抛出一个异常

Complex.parse=function(s){
	try{//假设解析成功
		var m=Complex._format.exec(s);//利用正则表达式进行匹配
		return new Complex(parseFloat(m[1]),parseFloat(m[2]));
	}catch(e){//解析失败，抛出异常
		throw new TypeError("Can't parse'"+s+"' as a complex number.");
	}
}

//定义类的‘私有’字段，这个字段在Complex.parse中用到了
//下划线前缀表明它是内部使用的，二部属于类的共有API部分
Complex._format=/^\{([^,]+),([^}]+)\}$/;

var c=new Complex(2,3);  //使用构造函数创建新的对象
var d=new Complex(c.i,c.r);//用到了c的实例属性
console.log(c.add(d).toString());  //{5,5}  使用了实例方法

var flag=Complex.parse(c.toString()).add(c.neg()).equals(Complex.ZERO);
console.log(flag);// true

//类的扩充,JavaScript中基于原型的继承机制是动态的：对象从其原型继承属性，如果创建对象之后
//原型的属性发生改变，也会影响到继承这个原型的所有实例属性

//添加一个计算复数的共轭复数（两个实部相等，虚部互为相反数的复数）
Complex.prototype.conj = function() {
	return new Complex(this.r,-this.i);
};



//JavaScript内置类的原型对象也是如此‘开放’
//ECMAScript3没有bind方法
if (!Function.prototype.bind) {
	Function.prototype.bind=function(o,/*,args*/){
		//将this和arguments的值保存在变量中
		//以便在后面调用
		var self=this,boundArgs=arguments;

		//bind方法返回的是一个函数
		return function(){
			//创建一个实参列表，将传入bind的第二个及后续参数都传入到这个函数
			var ars=[],i;
			for(i=0;i<boundArgs.length;i++)ars.push(boundArgs[i]);
			for(i=0;i<arguments.length;i++)ars.push(arguments[i]);
				//传入这些实参
				return self.apply(o,args);
		}
	}
}


//还有例子
//多次调用这个函数f，传入一个迭代器
//比如，要输出‘hello‘ 三次
//var n=3；
//n.times(function(n){console.log(n+'hello');});
Number.prototype.tiems=function(f,context){
	var n=Number(this);
	for (var i = 0; i < n; i++) {
		f.call(context,i);
	}
}

//如果不存在ES5的String.trim方法的话就定义它
String.prototype.trim=String.prototype.trim||function(){
	if(!this) return this;
	return this.replace(/^\s+|\s+$/g,'');
}

//返回函数的名字，如果它有非标准name属性，则直接使用name属性
//否则，将函数转换为字符串从中提取名字，如果没有名字的函数，则返回一个空字符串
Function.prototype.getName=function(){
	return this.name || this.toString().match(/function\s*([^()*])/)[1];
}

