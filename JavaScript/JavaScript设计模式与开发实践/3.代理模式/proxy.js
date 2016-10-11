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






