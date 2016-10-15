
//迭代器模式是指提供一种方法顺序访问一个聚合对象的各个元素，而又不暴露该对象的内部表示
//javascript原生也实现了

/*
//jQuery中的迭代器
$.each([1,2,3],function(i,n){
	console.log('下标：'+i);
	console.log('值'+n);
}*/

/*
//实现自己的迭代器  接受参数：第一个为被循环的数组，第二个为循环中的每一步后将触发的函数
var each=function(ary,callback){
	for(var i=0,l=ary.length;i<l;i++){
		callback.call(ary[i],i,ary[i]);   //把下标和元素当坐参数传给callback函数
	}
}

each([1,2,3],function(i,n){
	alert([i,n]);
})
*/

/*
//内部迭代器
var each=function(ary,callback){
	for(var i=0,l=ary.length;i<l;i++){
		callback.call(ary[i],i,ary[i]);   //把下标和元素当坐参数传给callback函数
	}
}

var compare=function(ary1,ary2){
	if(ary1.length!==ary2.length){
		throw new Error('ary1和ary2不相等');
	}
	each(ary1,function(i,n){
		if(n!==ary2[i]){
			throw new Error('ary1和ary2不相等');
		}
	})
	
	alert('ary1和ary2相等')
}

compare([1,2,3],[1,2,4]);  //	throw new Error('ary1和ary2不相等');
*/

/*
//外部迭代器   相对复杂，但是适用面广

var Iterator=function(obj){
	var current=0;
	
	var next=function(){
		current+=1;
	}
	
	var isDone=function(){
		return current>=obj.length; //判断当current大于obj的长度
	}
	
	var getCurrItem=function(){
		return obj[current];
	}
	
	return{
		next:next,
		isDone:isDone,
		getCurrItem:getCurrItem
	}
}

var compare=function(iterator1,iterator2){
	while(!iterator1.isDone()&&!iterator2.isDone()){
		if(iterator1.getCurrItem()!==iterator2.getCurrItem()){
			throw new Error('ary1和ary2不相等');
		}
		iterator1.next();
		iterator2.next();
	}
	
	alert('ary1和ary2相等');
}

var iterator1=Iterator([1,2,3]);
var iterator2=Iterator([1,2,3]);

compare(iterator1,iterator2);
*/

//迭代类数组对象和字面量对象
//在JavaScript中，for in语句可以用来迭代普通字面量对象的属性，jquery提供了$.each函数来封装各种迭代行为

/*
$.each=function(obj,callback){
	var value,
		i=0,
		length=obj.length,
		isArray=isArraylike(obj);
	if(isArray){   //数组
		for(;i<length;i++){
			value=callback.call(obj[i],i,obj[i]);
		}
		
		if(value===false){
			break;
		}
	}else{
		for(i in obj){  // 迭代对象
			value=callback.call(obj[i],i,obj[i]);
		}
		
		if(value===false){
			break;
		}
	}
	
	return obj;
}
*/

/*
//倒叙迭代器
var reverseEach=function(ary,callback){
	for(var l=ary.length-1;l>=0;l--){
		callback(l,ary[l]);
	}
}

reverseEach([0,1,2],function(i,n){
	console.log(n);   //2 ,1 ,0
})
*/

/*
// 中止迭代器
var each=function(ary,callback){
	for(var i=0,l=ary.length;i<l;i++){
		if(callback(i,ary[i])===false){
			break;
		}
	}
}

each([1,2,3,4,5],function(i,n){
	if(n>3){   //值大于3终止
		return false;
	}
	
	console.log(n);   //1,2,3
})
*/

/*
//根据不同浏览器获取相应的上传组件

//有三种上传方式，首选浏览器控件，没有则flash，再没有就是表单上传

//复杂难读，不好维护

var getUploadObj=function(){
	try{
		return new ActiveXObject('TXFNActiveX.FTNUpload');  //IE上传控件
	}catch(e){
		if(supportFlash){  //supportFlash函数未提供
			var str='<object type="application/x-shockwave-flash"></object>';
			return $(str).append($('body'));
		}else{
			var str='<input name="file" type="file" />';   // 表单上传
			return $(str).append($('body'));
		}
	}
}
*/

//迭代器模式改写

var getActiveUploadObj=function(){
	try{
		return new ActiveXObject('TXFNActiveX.FTNUpload'); 
	}catch(e){
		return false;
	}
}

var getFlashUploadObj=function(){
	if(supportFlash){  //supportFlash函数未提供
		var str='<object type="application/x-shockwave-flash"></object>';
		return $(str).append($('body'));
	}
	return false;
}

var getFormUploadObj=function(){
	var str='<input name="file" type="file" />';   // 表单上传
	return $(str).append($('body'));
}

var IteratorUploadObj=function(){
	for(var i=0,fn;fn=arguments[i++]){
		var uploadObj=fn();
		if(uploadObj!==false){
			return uploadObj;
		}
	}
}

var uploadObj=IteratorUploadObj(getActiveUploadObj,getFlashUploadObj,getFormUploadObj);

//如果还有HTML5上传

var getHtml5Upload=function(){
	
}

var uploadObj=IteratorUploadObj(getActiveUploadObj,getFlashUploadObj,getFormUploadObj,getHtml5Upload);





