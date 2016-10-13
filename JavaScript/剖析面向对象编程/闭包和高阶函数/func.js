
/*

var getUserInfo=function(userId,callback){
	$.ajax('http://xxx.com/getUserInfo?'+userId,function(data){
		if(typeof callback==='function'){
			callback(data);
		}
	})
}

getUserInfo(1111,function(data){
	alert(data.userName);
});

*/

/*
var appendDiv=function(callback){
	for(var i=0;i<100;i++){
		var div=document.createElement('div');
		div.innerHTML=i;
		document.body.appendChild(div);
		if(typeof callback==='function'){
			callback(div);
		}
	}
}

appendDiv(function(node){
	node.style.display='none';
});
*/

/*
alert([1,4,3].sort(function(a,b){
	return a-b;     
}));

//输出1,3,4

alert([1,4,3].sort(function(a,b){
	return b-a;     
}));
//输出4,3,1
*/

/*
var isString=function(obj){
	return Object.prototype.toString.call(obj)==='[object String]';
}

var isArray=function(obj){
	return Object.prototype.toString.call(obj)==='[object Array]';
}

var isNumber=function(obj){
	return Object.prototype.toString.call(obj)==='[object Number]';
}

console.log(isString('ff'));
*/

//alert(Object.prototype.toString.call([]));

/*
var isType=function(type){
	return function(obj){
		return Object.prototype.toString.call(obj)==='[object '+type+']';
	}
}

var isString=isType('String');
var isArray=isType('Array');
var isNumber=isType('Number');

console.log(isString('ff'));
*/

/*
var getSingle=function(fn){
	var ret;
	return function(){
		return ret || (ret=fn.apply(this,arguments));
	}
}

var getSingle=getSingle(function(){
	return document.createElement('script');
})

var script1=getSingle();
var script2=getSingle();

alert(script1===script2); //true
*/






