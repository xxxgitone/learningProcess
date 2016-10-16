
//发布-订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变是，所有依赖
//它的对象都将得到通知

//DOM事件
//只要我们曾经在DOM节点上绑定过事件函数，那我们就曾经使用过发布-订阅模式

/*
document.body.addEventListener('click',function(){
	alert(1);
},false);

document.body.click();  //模拟用户点击
 */
 
 /*
 //可以随意添加或者删除订阅者，都不会影响发布者

document.body.addEventListener('click',function(){
	alert(1);
},false);

document.body.addEventListener('click',function(){
	alert(2);
},false);

document.body.addEventListener('click',function(){
	alert(3);
},false);

document.body.click();  //模拟用户点击

*/


//案例信息：发布者为售楼部，订阅者为客户，订阅售房信息
/*
var salesOffices={};  //定义售楼部
salesOffices.clientList=[]; //缓存列表，存放订阅者的回调函数

salesOffices.listen=function(fn){  //增加订阅者
	this.clientList.push(fn);      //订阅者的信息添加进缓存列表
}

salesOffices.trigger=function(){    //发布消息
	for(var i=0,fn;fn=this.clientList[i++];){
		fn.apply(this,arguments);    //  arguments是发布消息带上的参数
	}
}

salesOffices.listen(function(price,squareMeter){  //小明的订阅信息
	console.log('价格='+price);
	console.log('squareMeter='+squareMeter);
})

salesOffices.listen(function(price,squareMeter){  //小红的订阅信息
	console.log('价格='+price);
	console.log('squareMeter='+squareMeter);
})

salesOffices.trigger(2000000,88);
salesOffices.trigger(3000000,110);

//价格=2000000
// squareMeter=88

// 价格=2000000
// squareMeter=88

// 价格=3000000
// squareMeter=110

// 价格=3000000
// squareMeter=110

*/

/*
//上面代码的缺陷：两者都收到了对方的订阅信息，增加一个key标识

var salesOffices={};  //定义售楼部

salesOffices.clientList=[]; //缓存列表，存放订阅者的回调函数

salesOffices.listen=function(key,fn){ 
	
	if(!this.clientList[key]){
		this.clientList[key]=[];  // 如果没有订阅过此类消息，给该类消息创建一个缓存列表
	}
	this.clientList[key].push(fn);      //订阅者的信息添加进缓存列表
	
}

salesOffices.trigger=function(){    //发布消息
	var key=Array.prototype.shift.call(arguments);  //取出消息类型
		fns=this.clientList[key];
		alert(fns);
		
	if(!fns || fns.length===0){   //如果没有该消息，则返回
		return false;
	}
	
	for(var i=0,fn;fn=fns[i++];){
		fn.apply(this,arguments);    //  arguments是发布消息带上的参数
	}
}

salesOffices.listen('squareMeter88',function(price){  //小明的订阅信息
	console.log('价格='+price);
})

salesOffices.listen('squareMeter110',function(price){  //小明的订阅信息
	console.log('价格='+price);
})


salesOffices.trigger('squareMeter88',2000000);   //发布88平米
salesOffices.trigger('squareMeter110',3000000);  //发布110平米
 
//价格=2000000
//价格=3000000

*/

//假设小明去别的售楼部买房，下面实现让另外一个售楼部拥有发布-订阅功能

//将发布-订阅功能提取出来
/*
var event={
	clientList:[],
	listen:function(key,fn){ 
		if(!this.clientList[key]){
			this.clientList[key]=[];  // 如果没有订阅过此类消息，给该类消息创建一个缓存列表
		}
		this.clientList[key].push(fn);      //订阅者的信息添加进缓存列表
	},
	trigger:function(){    //发布消息
		var key=Array.prototype.shift.call(arguments);  //取出消息类型
			fns=this.clientList[key];
			alert(fns);
			
		if(!fns || fns.length===0){   //如果没有该消息，则返回
			return false;
		}
		
		for(var i=0,fn;fn=fns[i++];){
			fn.apply(this,arguments);    //  arguments是发布消息带上的参数
		}
	},
}
//再定义一个函数，让这个函数可以给其他对象都动态的安装发布-订阅功能
var installEvent=function(obj){
	for(var i in event){
		alert(i);
		obj[i]=event[i];
	}
}

var salesOffices={};
installEvent(salesOffices);

salesOffices.listen('squareMeter88',function(price){  //小明的订阅信息
	console.log('价格='+price);
})

salesOffices.listen('squareMeter110',function(price){  //小红的订阅信息
	console.log('价格='+price);
})


salesOffices.trigger('squareMeter88',2000000);   //发布88平米
salesOffices.trigger('squareMeter110',3000000);  //发布110平米
 
//价格=2000000
//价格=3000000
*/

/*
//取消订阅事件
var event={
	clientList:[],
	listen:function(key,fn){ 
		if(!this.clientList[key]){
			this.clientList[key]=[];  // 如果没有订阅过此类消息，给该类消息创建一个缓存列表
		}
		this.clientList[key].push(fn);      //订阅者的信息添加进缓存列表
	},
	trigger:function(){    //发布消息
		var key=Array.prototype.shift.call(arguments);  //取出消息类型
			fns=this.clientList[key];
			alert(fns);
			
		if(!fns || fns.length===0){   //如果没有该消息，则返回
			return false;
		}
		
		for(var i=0,fn;fn=fns[i++];){
			fn.apply(this,arguments);    //  arguments是发布消息带上的参数
		}
	},
}
event.remove=function(key,fn){
	var fns=this.clientList[key];
	
	if(!fns){          //如果key对应的函数没有被订阅，则直接返回
		return false;
	}
	
	if(!fn){   //如果没有传入具体的回调函数，表示需要取消key对应的所有订阅
		fns&&(fns.length=0);
	}else{
		for(var l=fns.length-1;l>=0;l--){//反向遍历
			var _fn=fns[l];
			if(_fn===fn){
				fns.splice[l,1];  //删除订阅者的回调函数
			}
		}
	}
	
}

var installEvent=function(obj){
	for(var i in event){
		obj[i]=event[i];
	}
} 

var salesOffices={};
installEvent(salesOffices);

salesOffices.listen('squareMeter88',fn1=function(price){  //小明的订阅信息
	console.log('价格='+price);
})

salesOffices.listen('squareMeter110',fn2=function(price){  //小红的订阅信息
	console.log('价格='+price);
})


salesOffices.remove('squareMeter88',fn1);   //取消小明的
salesOffices.trigger('squareMeter110',3000000);  //
*/

