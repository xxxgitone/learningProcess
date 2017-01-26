const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
// 设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。
// round
// 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
ctx.lineJoin = 'round';
// 指定如何绘制每一条线段末端的属性。有3个可能的值，分别是：butt, round and square。默认值是 butt。
// round
// 线段末端以圆形结束。
ctx.lineCap = 'round';
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
	if (!isDrawing) return;
	console.log(e);
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	// offsetX获取鼠标指针位置相对于触发事件的对象的 x 坐标。
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	// lastX = e.offsetX;
	// lastY = e.offsetY;
	// 解构赋值
	[lastX, lastY] = [e.offsetX, e.offsetY];

	hue++;

	if (hue >= 360) {
		hue = 0;
	}

	if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
		direction =!direction;
	}
	
	if (direction) {
		ctx.lineWidth++;
	}else{
		ctx.lineWidth--;
	}
	
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);






