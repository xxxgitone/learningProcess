const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const slider = document.querySelector('#scale-range');
const image = new Image();

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
}

function drawImageByScale(scale) {

	const imageWidth = 1152 * scale;
	const imageHeight = 580 * scale;
	
	const dx = canvas.width / 2 - imageWidth / 2;
	const dy = canvas.height / 2 - imageHeight / 2;
	
	//清空画布
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(image, dx, dy, imageWidth, imageHeight);

}








