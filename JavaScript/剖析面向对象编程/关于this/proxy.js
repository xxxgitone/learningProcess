//'http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg'

//代理模式，是为一个对象提供一个代用品或者占位符，以便控制对它的访问

//虚拟代理实现图片预加载
/*
//没有代理
var myImage=(function(){
	var imgNode=document.createElement('img');
	document.body.appendChild(imgNode);
	
	return {
		setSrc:function(src){
			imgNode.src=src;
		}
	}
})();

myImage.setSrc('http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg');

*/
/*
//引入代理
var myImage=(function(){
	var imgNode=document.createElement('img');
	document.body.appendChild(imgNode);
	
	return {
		setSrc:function(src){
			imgNode.src=src;
		}
	}
})();

var proxyImage=(function(){
	var img=new Image;
	img.onload=function(){
		myImage.setSrc(this.src);
	}
	
	return{
		setSrc:function(src){
			myImage.setSrc('wait_load.jpg');
			img.src=src;
		}
	}
})();

proxyImage.setSrc('http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg');

proxyImage('http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg'); //可直接这样调用，
*/

/*
//不用代理实现预加载  违反单一职责原则
var myImage=(function(){
	var imgNode=document.createElement('img');
	document.body.appendChild(imgNode);
	var img=new Image;
	
	img.onload=function(){
		imgNode.src=img.src;
	}
	
	return {
		setSrc:function(src){
			imgNode.src='wait_load.jpg';
			img.src=src;
		}
	}
})(); 

myImage.setSrc('http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg');
*/

//虚拟代理合并HTTP请求,假设我们在做一个文件同步功能，当我们选中checkbox时，它对应的文件就会同步到另外一台服务器设备中

/*
//给checkbox绑定点击事件，并且在点击的时候同步到另外一台服务器设备中,产生大量的开销
var synchronousFile=function(id){
	console.log('开始同步文件，id为：'+id);
}

var checkbox=document.getElementsByTagName('input');

for(var i=0,c;c=checkbox[i++];){
	c.onclick=function(){
		if(this.checked==true){
			synchronousFile(this.id);
		}
	}
}
*/

//解决方案，通过proxySynchronousFile来收集一段时间之内的请求，最后一次性发送给服务器，等待2秒之后才把这两秒之内选中的提交给服务器
/*
var synchronousFile=function(id){
	console.log('开始同步文件，id为：'+id);
}

var proxySynchronousFile=(function(){
	var cache=[],  //保存一段时间内需要同步的id
		timer;    //定时器
	
	return function(id){
		
		cache.push(id);
		if(timer){     //保证不会覆盖已经启动的定时器
			return;
		}
		
		timer=setTimeout(function(){
			synchronousFile(cache.join(','));   //2秒后向本体发送需要同步的ID集合
			clearTimeout(timer);    //清空定时器
			timer=null;
			cache.length=0;   //清空id
		},2000);
	}
})();

var checkbox=document.getElementsByTagName('input');

for(var i=0,c;c=checkbox[i++];){
	c.onclick=function(){
		if(this.checked==true){
			proxySynchronousFile(this.id);
		}
	}
}
*/

//虚拟代理在惰性加载中的应用

//在按下f2后开始加载miniConsole.js,加载完成后将遍历miniConsole代理对象中的缓存函数队列，同时依次执行它们

/*
//没有加载miniConsole.js之前的代码
var cache=[];

var miniConsole={
	log:function(){
		var args=arguments;
		cache.push(function(){
			return miniConsole.log.apply(miniConsole,args);
		})
	}
}

miniConsole.log(1);

//当按下f2时，加载miniConsole.js
var handler=function(ev){
	if(ev.keyCode===113){
		var script=document.createElement('script');
		script.onload=function(){
			for(var i,fn;fn=cache[i++];){
				fn();
			}
		}
		script.src='miniConsole.js';
		document.getElementsByTagName[0].appendChild(script);
	}
}

document.body.addEventListener('keydown',hadler,false);

//miniConsole.js代码
miniConsole={
	log:function(){
		//真正代码略
	}
}
*/

/*
//完善，不能多次加载
var miniConsole=(function(){
	var cache=[];
	var handler=function(ev){
	if(ev.keyCode===113){
		var script=document.createElement('script');
		script.onload=function(){
			for(var i,fn;fn=cache[i++];){
				fn();
			}
		}
		script.src='miniConsole.js';
		document.getElementsByTagName[0].appendChild(script);
		document.body.removeEventListener('keydown',hadler);  //只加载一次
	}
}

document.body.addEventListener('keydown',hadler,false);

		return{ 
			log:function(){
				var args=arguments;
				cache.push(function(){
					return miniConsole.log.apply(miniConsole,args);
				});
			}
		}
})();
	

miniConsole.log(11);

*/

//缓存代理
/*
//计算乘积
var mult=function(){
	console.log('开始计算乘积');
	var a=1;
	for(var i=0,l=arguments.length;i<l;i++){
		a=a*arguments[i];
	}
	return a;
}

// alert(mult(2,3));
// alert(mult(2,3,4));

//加入代理
var proxyMult=(function(){
	var cache=[];
	return function(){
		var args=Array.prototype.join.call(arguments,',');
		if(args in cache){
			return cache[args];
		}
		return cache[args]=mult.apply(this,arguments);
	}
})();

alert(proxyMult(2,3,4));
alert(proxyMult(2,3,4));  //执行第二次的时候，并没有执行mult本体

*/
/*
//用高阶函数动态创建代理
var mult=function(){
	var a=1;
	for(var i=0,l=arguments.length;i<l;i++){
		a=a*arguments[i];
	}
	return a;
}

var plus=function(){
	var a=0;
	for(var i=0,l=arguments.length;i<l;i++){
		a=a+arguments[i];
	}
	return a;
}

var createProxyFactory=function(fn){
	var cache=[];
	return function(){
		var args=Array.prototype.join.call(arguments,',');
		if(args in cache){
			return cache[args];
		}
		return cache[args]=fn.apply(this,arguments);
	}
}

var proxyMult=createProxyFactory(mult);
var proxyPlus=createProxyFactory(plus);

alert(proxyMult(2,3,4));
alert(proxyMult(2,3,4));
alert(proxyPlus(2,3,4));
alert(proxyPlus(2,3,4));
*/
