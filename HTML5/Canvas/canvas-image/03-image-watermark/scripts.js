const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const slider = document.querySelector('#scale-range');
const image = new Image();

const watermarkCanvas = document.querySelector('#watermark-canvas');
const watermarkCtx = watermarkCanvas.getContext('2d');

window.onload = () => {
	canvas.width = 1152;
	canvas.height = 580;

	image.src = 'img-lg.jpg';

	let scale = slider.value;

	image.onload = () => {

		//ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		
		drawImageByScale(scale);
		
		slider.onmousemove = () => {
			scale = slider.value;
			drawImageByScale(scale);
		}
	}

	//水印绘制
	watermarkCanvas.width = 400;
	watermarkCanvas.height = 100;

	watermarkCtx.font = 'bold 50px Arial';
	watermarkCtx.lineWidth = '1';
	watermarkCtx.fillStyle = 'rgba(255 ,255, 255, 0.5)';
	watermarkCtx.textBaseline = 'middle';
	watermarkCtx.fillText( '== xxxgit ==', 20, 50);
}

function drawImageByScale(scale) {

	const imageWidth = 1152 * scale;
	const imageHeight = 580 * scale;
	
	const dx = canvas.width / 2 - imageWidth / 2;
	const dy = canvas.height / 2 - imageHeight / 2;
	
	//清空画布
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(image, dx, dy, imageWidth, imageHeight);

	//绘制水印
	ctx.drawImage(watermarkCanvas, canvas.width - watermarkCanvas.width, canvas.height - watermarkCanvas.height);
}








