//get是使用get方法进行一步请求

//$.get(url[,data][,callback][,type])
//url：请求HTMl页面的url
//data：发送至服务器的key/value数据
//callback 载入成功时回调函数(只有Response的返回状态是success才调用该方法)自动将请求结果和状态传递给该方法
//type:    服务器端返回内容的格式，xml、html、script、json、text、和_default


$(function() {

	//处理HTML文档
	// $('#send').click(function(){
	// 	$.get('get1.php',{
	// 		username:$('#username').val(),
	// 		content:$('#content').val(),
	// 	},function(data,textStatus){
	// 		$('#resText').html(data);
	// 	})
	// })

	//XML文档
	/*
	$('#send').click(function() {
		$.get('get2.php', {
			username: $('#username').val(),
			content: $('#content').val(),
		}, function(data, textStatus) {
			var username = $(data).find("comment").attr("username");
			var content = $(data).find("comment content").text();
			var txtHtml = "<div class='comment'><h6>" + username + ":</h6><p class='para'>" + content + "</p></div>";
			$("#resText").html(txtHtml); // 把返回的数据添加到页面上
		})
	})
	*/

	//json
	$('#send').click(function() {
		$.get('get3.php', {
			username: $('#username').val(),
			content: $('#content').val(),
		}, function(data, textStatus) {
			var username = data.username;
			var content = data.content;
		    var txtHtml = "<div class='comment'><h6>"+username+":</h6><p class='para'>"+content+"</p></div>";
            $("#resText").html(txtHtml); // 把返回的数据添加到页面上
		},'json')
	})
})


//$.post方法与$.get用法相同