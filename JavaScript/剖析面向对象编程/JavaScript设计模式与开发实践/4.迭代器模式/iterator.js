
//迭代器模式是指提供一种方法顺序访问一个聚合对象的各个元素，而又不暴露该对象的内部表示
//javascript原生也实现了

/*
//jQuery中的迭代器
$.each([1,2,3],function(i,n){
	console.log('下标：'+i);
	console.log('值'+n);
}*/

//实现自己的迭代器  接受参数：第一个为被循环的数组，第二个为循环中的每一步后将触发的函数
var each=function(ary,callback){
	for(var i=0,l=ary.length;i<l;i++){
		callback.call(ary[i],i,ary[i]);   //把下标和元素当坐参数传给callback函数
	}
}

each([1,2,3],function(i,n){
	alert([i,n]);
})


























