
/*
var obj={
	a:1,
	getA:function(){
		alert(this===obj); //true
		alert(this.a);    //1
	}
}

obj.getA();
*/

/*
window.name='globalName';

var getName=function(){
	return this.name;
}

console.log(getName());
*/

/*
window.name='globalName';

var myObject={
	name:'jiang',
	getName: function(){
		return this.name;
	}
};

var getName=myObject.getName;

console.log(getName());
*/

/*
document.getElementById('div1').onclick=function(){
	var that=this;
	var callback=function(){
		alert(that.id);   //undefined
	}
	
	callback();
}
*/
/*
var myClass=function(){
	this.name='jiang';
	return 'name';  
} 

var obj=new myClass();
alert(obj.name);  //jiang
*/

/*
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

*/

/*
var obj={
	name:'jiang',
	getName:function(){
		return this.name;
	}
}

console.log(obj.getName());  //jiang

var getName2=obj.getName;
console.log(getName2());    //undefined
*/

/*
document.getElementById=(function(func){
	return function(){
		return func.apply(document,arguments);
	}
})(document.getElementById);

var getId=document.getElementById;
alert(getId('div1'));
*/
/*
var func=function(a,b,c){
	alert([a,b,c]);  //1,2,3
}

func.apply(null,[1,2,3]);

*/
// var func=function(a,b,c){
	// alert([a,b,c]);  //1,2,3
// }

// func.call(this,1,2,3);

// var func=function(a,b,c){
	// "use strict"
	// alert(this);   //null
	
// }

// func.apply(null,[1,2,3]);

//alert(Math.max.apply(null,[1,2,3,4,5]));  //5

/*
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
getName.call(obj1);   //jiang
getName.call(obj2);    //zhi
 */
 /*
document.getElementById('div1').onclick=function(){
	alert(this.id);  //div1
	var func=function(){
		alert(this.id)  //undefined
	}
	func();
}
*/
/*
document.getElementById('div1').onclick=function(){
	var func=function(){
		alert(this.id)  //div1
	}
	func.call(this);
}
*/
/*
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
*/

/*
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
*/

/*
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
*/

(function(){
	Array.prototype.push.call(arguments,3);
	console.log(arguments);   //[1,2,3]
})(1,2);

