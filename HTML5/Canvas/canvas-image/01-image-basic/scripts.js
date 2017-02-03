const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const image = new Image();

window.onload = () => {
	canvas.width = 1152;
	canvas.height = 620;

	image.src = 'img.jpg';

	// 图片加载完
	image.onload = () => {
		//0,0表示从画布的0,0位置开始绘制
		// ctx.drawImage(image, 0, 0);
		//最后两个参数表示图片绘制的大小
		// ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		
		//drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
		//图片的x,y位置开始截取长为sw，高位sh的图片，然后渲染在距离画布dx,dy位置，宽度为dw，高位dh
		ctx.drawImage(image, 600, 200, 400, 400, 200, 200, 400, 400);
		
	}



}








