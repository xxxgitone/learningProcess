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

// 灰色滤镜
function greyEffect() {
	//获取画布a的图片信息
	const imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
	const pixelData = imageData.data;

	for (let i = 0; i < canvasa.width * canvasb.height; i++) {

		const r = pixelData[4 * i + 0];
		const g = pixelData[4 * i + 1];
		const b = pixelData[4 * i + 2];

		const grey = r * 0.3 + g * 0.59 + b * 0.11;

		pixelData[4 * i + 0] = grey;
		pixelData[4 * i + 1] = grey;
		pixelData[4 * i + 2] = grey;

	}

	contextb.putImageData(imageData, 0, 0, 0, 0, canvasb.width, canvasb.height);
	//如果后面参数一样，可以简写
	// contextb.putImageData(imageData, 0, 0);
}

// 黑白滤镜
function blackEffect() {
	const imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height)
	const pixelData = imageData.data
	for (let i = 0; i < canvasb.width * canvasb.height; i++) {

		const r = pixelData[i * 4 + 0]
		const g = pixelData[i * 4 + 1]
		const b = pixelData[i * 4 + 2]

		const grey = r * 0.3 + g * 0.59 + b * 0.11
		let pv;
		if (grey > 255 / 2) {
			pv = 255
		} else {
			pv = 0
		}

		pixelData[i * 4 + 0] = pv
		pixelData[i * 4 + 1] = pv
		pixelData[i * 4 + 2] = pv
	}

	contextb.putImageData(imageData, 0, 0, 0, 0, canvasa.width, canvasa.height)

}

//反色滤镜
function reverseEffect() {
	const imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height)
	const pixelData = imageData.data
	for (let i = 0; i < canvasb.width * canvasb.height; i++) {

		const r = pixelData[i * 4 + 0];
		const g = pixelData[i * 4 + 1];
		const b = pixelData[i * 4 + 2];



		pixelData[i * 4 + 0] = 255 - r;
		pixelData[i * 4 + 1] = 255 - g;
		pixelData[i * 4 + 2] = 255 - b;
	}

	contextb.putImageData(imageData, 0, 0, 0, 0, canvasa.width, canvasa.height)

}

//模糊滤镜
function blurEffect() {
	//参考像素
	const tmpImageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height)
	const tmpPixelData = tmpImageData.data;

	const imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height)
	const pixelData = imageData.data;

	for (let i = 1; i < canvasb.height - 1; i++)
		for (let j = 1; j < canvasb.width - 1; j++) {

			let totalr = 0,
				totalg = 0,
				totalb = 0;
			for (let dx = -1; dx <= 1; dx++)
				for (let dy = -1; dy <= 1; dy++) {
					const x = i + dx;
					const y = j + dx;

					let p = x * canvasb.width + y;
					totalr += tmpImageData[p * 4 + 0];
					totalg += tmpImageData[p * 4 + 1];
					totalb += tmpImageData[p * 4 + 2];

				}

			let p = i * canvasb.width + j;
			pixelData[p * 4 + 0] = totalr / 9;
			pixelData[p * 4 + 1] = totalg / 9;
			pixelData[p * 4 + 2] = totalb / 9;

		}



	contextb.putImageData(imageData, 0, 0, 0, 0, canvasa.width, canvasa.height)
}