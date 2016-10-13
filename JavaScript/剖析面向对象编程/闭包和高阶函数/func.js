
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

alert([1,4,3].sort(function(a,b){
	return a-b;     
}));

//输出1,3,4

alert([1,4,3].sort(function(a,b){
	return b-a;     
}));
//输出4,3,1










