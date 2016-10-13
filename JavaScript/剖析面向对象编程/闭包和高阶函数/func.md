#高级函数
指至少满足下列条件之一的函数

	1.函数可以作为参数被传递
	2.函数可以作为返回值输出

##1.函数作为参数传递
* 回调函数

	> ajax异步请求的应用中，回调函数的使用

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
	
	> 在页面创建100个div节点，然后把这些div节点都设置成隐藏

		var appendDiv=function(){
			for(var i=0;i<100;i++){
				var div=document.createElement('div');
				div.innerHTML=i;
				document.body.appendChild(div);
				div.style.display='none';
			}
		}
	
		appendDiv();

	div.style.display='none';放在appendChild中有些不合理，抽出来。并不是每个人希望创建好后隐藏

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
* Array.prototype.sort

	接收一个函数当做参数，这个函数里面封装了数组元素的排序规则

		alert([1,4,3].sort(function(a,b){
			return a-b;     
		}));
		
		//输出1,3,4
		
		alert([1,4,3].sort(function(a,b){
			return b-a;     
		}));
		//输出4,3,1