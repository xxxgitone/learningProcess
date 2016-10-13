

/*
//作用域
var func=function(){
	var a=1;
	alert(a);//1
}
func();
alert(a); //ReferenceError: a is not defined
*/

/*
var a=1;
var func1=function(){
	var b=2;
	var func2=function(){
		var c=3;
		alert(b); //输出2
		alert(a); //输出1
	}
	func2();
	alert(c);//ReferenceError: c is not defined
}

func1();
*/

/*
var func=function(){
	var a=1;
	return function(){
		a++;
		alert(a);
	}
}
var f=func();

f();  //2
f();  //3
f();  //4
f();  //5
*/
/*
var node=document.getElementsByTagName('div');
for(var i=0,l=node.length;i<l;i++){
	node[i].onclick=function(){
		alert(i);
	}
}
*/

/*
var node=document.getElementsByTagName('div');
for(var i=0,l=node.length;i<l;i++){
	// (function(i){
		// node[i].onclick=function(){
			// alert(i);
		// }
	// })(i);
	
	node[i].onclick=(function(i){
		return function(){
			alert(i);
		}
	})(i);
}
*/

/*
var Type={};

for(var i=0,type;type=['String','Array','Number'][i++];){
	(function(type){
		Type['is'+type]=function(obj){
			return Object.prototype.toString.call(obj)==='[object '+type+']';
		}
	})(type);
}

alert(Type.isArray([]));
alert(Type.isString('str'));
*/

/*
var mult=function(){
	var a=1;
	for(var i=0,l=arguments.length;i<l;i++){
		a=a*arguments[i];
	}
	return a;
}

alert(mult(1,2,3));
*/
/*
var cache={};

var mult=function(){
	var args=Array.prototype.join.call(arguments,',');
	alert(args);
	if(cache[args]){
		return cache[args];
	}
	var a=1;
	alert('第二次');   //第二次不会执行
	for(var i=0,l=arguments.length;i<l;i++){
		a=a*arguments[i];
	}
	return cache[args]=a;
}
alert(mult(1,2,3));
alert(mult(1,2,3));
*/

/*
var mult=(function(){
	var cache={};
	
	return function(){
		var args=Array.prototype.join.call(arguments,',');
		if(cache[args]){
			return cache[args];
		}
		var a=1;
		for(var i=0,l=arguments.length;i<l;i++){
			a=a*arguments[i];
		}
		return cache[args]=a;
	}
})();

alert(mult(1,2,3));
alert(mult(1,2,3));
*/

/*
var mult=(function(){
	var cache={};
	
	var calculate=function(){  //封闭calculate函数
		var a=1;
		for(var i=0,l=arguments.length;i<l;i++){
			a=a*arguments[i];
		}
		return a;
	}

	return function(){
		var args=Array.prototype.join.call(arguments,',');
		if(cache[args]){
			return cache[args];
		}
		
		return　cache[args]=calculate.apply(null,arguments);
	
	}
})();

alert(mult(1,2,3));
alert(mult(1,2,3));
*/
/*
var report=(function(){
	var img=[];
	
	return function(src){
		var img=new Image();
		img.push(img);
		img.src=src;
	}
})();
*/

/*
var extent=function(){
	var value=0;
	return {
		call:function(){
			value++;
			console.log(value);
		}
	}
}

var extent=extent();

extent.call(); //1
extent.call();  //2
extent.call();  //3
*/

/*
var extent={
	value:0,
	call:function(){
		this.value++;
		console.log(this.value);
	}
}

extent.call(); //1
extent.call();  //2
extent.call();  //3
*/

/*
var Extent=function(){
	this.value=0;
}

Extent.prototype.call=function(){
	this.value++;
	console.log(this.value);
}

var extent=new Extent();

extent.call(); //1
extent.call();  //2
extent.call();  //3
*/

/*
var Tv={
	open:function(){
		console.log('打开电视机');
	},
	close:function(){
		console.log('关闭电视机');
	}
}

var OpenTvCommand=function(receiver){
	this.receiver=receiver;
}

OpenTvCommand.prototype.execute=function(){
	this.receiver.open();    //执行命令，打开电视机
}

OpenTvCommand.prototype.undo=function(){
	this.receiver.close();  	//撤销命令，关闭电视机
}

var setCommand=function(command){
	document.getElementById('execute').onclick=function(){
		command.execute();  	//输出：打开电视机
	}
	document.getElementById('undo').onclick=function(){
		command.undo();  	//输出：关闭电视机
	}
}
setCommand(new OpenTvCommand(Tv));
*/


var Tv={
	open:function(){
		console.log('打开电视机');
	},
	close:function(){
		console.log('关闭电视机');
	}
}

var createCommand=function(receiver){
	var execute=function(){
		return receiver.open();    //执行命令，打开电视机
	}
	
	var undo=function(){
		return receiver.close();   //撤销命令，关闭电视机
	}
	
	return{
		execute:execute,
		undo:undo
	}
}

var setCommand=function(command){
	document.getElementById('execute').onclick=function(){
		command.execute();  	//输出：打开电视机
	}
	document.getElementById('undo').onclick=function(){
		command.undo();  	//输出：关闭电视机
	}
}
setCommand(createCommand(Tv));






