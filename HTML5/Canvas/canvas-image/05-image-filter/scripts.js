const canvasa = document.querySelector('#canvasa');
const contexta = canvasa.getContext('2d');


const canvasb = document.querySelector('#canvasb');
const contextb = canvasb.getContext('2d');

const image = new Image();

window.onload = () => {
	image.src = 'autumn.jpg';
	image.onload = () => {
		contexta.drawImage(image, 0, 0, canvasa.width, canvasa.height);
	}
}

function filter() {
	//获取画布a的图片信息
	const imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
	const pixelData = imageData.data;

	for (var i = 0; i < canvasa.width * canvasb.height; i++) {
		
		pixelData[4*i+0] = 0;
		pixelData[4*i+1] = 0;
		pixelData[4*i+2] = 0;
	}

	contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
	//如果后面参数一样，可以简写
	// contextb.putImageData(imageData, 0, 0);
}





