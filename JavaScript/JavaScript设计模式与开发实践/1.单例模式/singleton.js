//单例模式：保证一个类只有一个实例，并提供一个访问他的全局访问点

//实现：用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例是，直接返回之前创建过的对象
/*
var Singleton=function(name){
	this.name=name;
	this.instance=null;
}

Singleton.prototype.getName=function(){
	alert(this.name);
}

Singleton.getInstance=function(name){
	if(!this.instance){
		this.instance=new Singleton(name);
	}
	return this.instance;
}

var a=Singleton.getInstance('jiang1');
var b=Singleton.getInstance('jiang2');
alert(a===b);
*/
/*
//或者   缺点：不能使用new来创建实例，要使用Singleton.getInstance，导致不透明
var Singleton=function(name){
	this.name=name;
}

Singleton.prototype.getName=function(){
	alert(this.name);
}

Singleton.getInstance=(function(){
	var instance=null;
	return function(name){
		if(!this.instance){
		this.instance=new Singleton(name);
	}
		return this.instance;
	}
})();

var a=Singleton.getInstance('jiang1');
var b=Singleton.getInstance('jiang2');
alert(a===b);
*/

/*
//透明的单例模式    
//创建唯一的div节点
//有许多不足,违反单一职责原则
var CreateDiv=(function(){
	var instance;
	var CreateDiv=function(html){
		if(instance){
			return instance;
		}
		this.html=html;
		this.init();
		return instance=this;
	}
	
	CreateDiv.prototype.init=function(){
		var div=document.createElement('div');
		div.innerHTML=this.html;
		document.body.appendChild(div);
	}
	
	return CreateDiv;
	
})();

var a=new CreateDiv('jiang1');
var b=new CreateDiv('jiang2');
*/

/*
//用代理实现单例
var CreateDiv=function(html){
	this.html=html;
	this.init();
}
	
CreateDiv.prototype.init=function(){
	var div=document.createElement('div');
	div.innerHTML=this.html;
	document.body.appendChild(div);
}

var ProxySingletonCreateDiv=(function(){
	var instance;
	return function(html){
		if(!instance){
			instance=new CreateDiv(html);
		}
		
		return instance;
	}
})();

var a=new ProxySingletonCreateDiv('jiang1');
var b=new ProxySingletonCreateDiv('jiang2');
*/

//JavaScript中的单例模式

//惰性单例  以webqq登录为例 

/*
//失去单例的效果，每次单击都会创建一个新的div
var createLoginLayer=function(){
	var div=document.createElement('div');
	div.innerHTML='我是登录悬浮框';
	div.style.display='none';
	document.body.appendChild(div);
	return div;
}

document.getElementById('loginBtn').onclick=function(){
	var loginLayer=createLoginLayer();
	loginLayer.style.display='block';
}

*/

//单例创建，仍然违反了单一职责原则
/*
var createLoginLayer=(function(){
	var div;
	return function(){
		if(!div){
			div=document.createElement('div');
			div.innerHTML='我是登录悬浮框';
			div.style.display='none';
			document.body.appendChild(div);
		}
		return div;
	}
})();

document.getElementById('loginBtn').onclick=function(){
	var loginLayer=createLoginLayer();
	loginLayer.style.display='block';
}
*/
//创建通用的惰性单例

//创建单例的代码,以后还可以传入createScript、createIframe、createXhr
/*
var getSingle=function(fn){
	var result;
	return function(){
		return result||(result=fn.apply(this,arguments));
	}
}

var createLoginLayer=function(){
	var div=document.createElement('div');
	div.innerHTML='我是登录悬浮框';
	div.style.display='none';
	document.body.appendChild(div);
	return div;
}

var createSingleLoginLayer=getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick=function(){
	var loginLayer=createSingleLoginLayer();
	loginLayer.style.display='block';
}
*/

/*
//创建唯一iframe
var getSingle=function(fn){
	var result;
	return function(){
		return result||(result=fn.apply(this,arguments));
	}
}

var createSingleIframe=getSingle(function(){
	var iframe=document.createElement('iframe');
	document.body.appendChild(iframe);
	return iframe;
})

document.getElementById('loginBtn').onclick=function(){
	var loginLayer=createSingleIframe();
	loginLayer.src='http://baidu.com';
}
*/









