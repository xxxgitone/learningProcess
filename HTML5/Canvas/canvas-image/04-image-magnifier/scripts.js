const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const offCanvas = document.querySelector('#offCanvas');
const offCtx = offCanvas.getContext('2d');


const image = new Image();
let isMouseDown = false;
let scale;



window.onload = () => {
	canvas.width = 1152;
	canvas.height = 580;

	image.src = 'img-lg.jpg';


	image.onload = () => {
		
		offCanvas.width = image.width;
		offCanvas.height = image.height;
		scale = offCanvas.width / canvas.width;
		
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		offCtx.drawImage(image, 0, 0);
	}

}

function windowToCanvas(x, y) {
	//Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
	var bbox = canvas.getBoundingClientRect();
	return {
		x: x - bbox.left,
		y: y - bbox.top
	}
}

function drawCanvasWithMagnifier(isShowMagnifier, point) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	if (isShowMagnifier) {
		drawMagnifier(point)
	}
}

function drawMagnifier(point) {
	const imageLG_cx = point.x * scale;
	const imageLG_cy = point.y * scale;

	const mr = 200;

	const sx = imageLG_cx - mr;
	const sy = imageLG_cy - mr;

	const dx = point.x - mr;
	const dy = point.y - mr;
	
	ctx.save();
	
	ctx.lineWidth = 10.0;
	ctx.strokeStyle = '#069';


	ctx.beginPath();
	//前两个表示圆心位置
	ctx.arc(point.x, point.y, mr, 0, Math.PI*2);
	ctx.stroke();
	ctx.clip();

	ctx.drawImage(offCanvas, sx, sy, 2*mr, 2*mr, dx, dy, 2*mr, 2*mr);

	ctx.restore();
}


canvas.addEventListener('mousedown', (e) => {
	e.preventDefault();
	const point = windowToCanvas(e.clientX, e.clientY);

	isMouseDown = true;

	drawCanvasWithMagnifier(true, point);
})

canvas.addEventListener('mousemove', (e) => {
	e.preventDefault();
	if (isMouseDown) {
		const point = windowToCanvas(e.clientX, e.clientY);
		drawCanvasWithMagnifier(true, point);
	}
})

canvas.addEventListener('mouseup', (e) => {
	e.preventDefault();

	isMouseDown = false;

	drawCanvasWithMagnifier(false);
})

//移出canvas画布时
canvas.addEventListener('mouseout', (e) => {
	e.preventDefault();
	isMouseDown = false;
	drawCanvasWithMagnifier(false);
})











