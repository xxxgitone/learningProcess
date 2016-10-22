function Ajax() {

	var xhr = null;
	if (window.ActiveXObject) {//IE5 6
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {//除以上以外
		xhr = new XMLHttpRequest();
	}

	xhr.open('GET','test.php',true);  //初始化xhr对象调用open方法并采用异步的方法，默认也为异步

	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				document.getElementById('resText').innerHTML=xhr.responseText;
			}
		}
	}

	xhr.send(null);  //使用get方法提交，使用null
}