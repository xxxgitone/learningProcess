const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	// 用于收集系统上可用的多媒体输入和输出设备的信息
	navigator.mediaDevices.getUserMedia({ video: true, audio: false})
		.then(localMediaStream => {
			console.log(localMediaStream);
			//URL.createObjectURL() 静态方法会创建一个 DOMString，它的 URL 表示参数中的对象。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示着指定的 File 对象或者 Blob 对象。
			video.src = window.URL.createObjectURL(localMediaStream);
			video.play();
		})
}

getVideo();