//load 方法，一般获取静态的数据文件
//load(url[,data][,callback])
//url：请求HTMl页面的url
//data：发送至服务器的key/value数据
//callback 回调函数

//载入HTML文档
/*
$(function(){
	$('#send').click(function(){
		$('#resText').load('test.html');
	});
})

//筛选载入的html文档
$(function(){
	$('#send').click(function(){
		$('#resText').load('test.html .para');
	});
})
*/

//传递方式
//load方法的传递方式根据参数data来自动指定。没有参数是get方式，有参数则自动转换为post。

	//GET
	$('#resText').load('test.php', function() {
		//
	});

	//POST
	$('#resText').load('test.php', {
		name: 'rain',
		age: 20
	}, function() {
		//
	});

//回调参数
//对于必须在加载完才能执行的操作，load提供的回调函数

$('#resText').load('test.php', function(responseText,textStatus,XMLHttpRequset) {
		//responseText:         请求返回的内容
		//textStatus:    		请求状态：success、error、notmodified、timeout
		//XMLHttpRequset: 		XMLHttpRequest对象
});