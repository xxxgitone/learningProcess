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
		.catch(err => {
			console.error(`OH No!!`, err);
		})
}

function paintCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	console.log(width, height);
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		//0,0表示从距离画布的0,0位置绘制
		ctx.drawImage(video, 0, 0, width, height);
		//getImageData() 方法返回 ImageData 对象，该对象拷贝了画布指定矩形的像素数据
		//对于 ImageData 对象中的每个像素，都存在着四方面的信息，即 RGBA 值：
		// R - 红色 (0-255)
		// G - 绿色 (0-255)
		// B - 蓝色 (0-255)
		// A - alpha 通道 (0-255; 0 是透明的，255 是完全可见的)
		let pixels = ctx.getImageData(0, 0, width, height);
		 // pixels = redEffect(pixels);

    pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    // pixels = greenScreen(pixels);

		//然后通过 putImageData() 将图像数据放回画布
		ctx.putImageData(pixels, 0, 0);
		// debugger;
	}, 16)
}

function takePhoto() {
	//拍照声音
	snap.currentTime = 0;
	snap.play();
	
	//HTMLCanvasElement.toDataURL() 方法返回一个包含图片展示的 data URI 
	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	//	download属性规定被下载的超链接目标。
	link.setAttribute('download', 'handsome');
	// link.textContent = 'Download Image';
	link.innerHTML = `<img src="${data}" alt="Handsome Man" />`
	strip.insertBefore(link, strip.firstChild);
	
}


function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

//当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件。
video.addEventListener('canplay', paintCanvas);