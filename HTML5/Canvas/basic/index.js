window.onload = () => {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')

  // 填充三角形, 填充，将会自动闭合图形
  // ctx.beginPath()
  // ctx.moveTo(25,25)
  // ctx.lineTo(105,25)
  // ctx.lineTo(25,105)
  // ctx.fill()

  // 描边三角形
  // ctx.beginPath();
  // ctx.moveTo(125,125);
  // ctx.lineTo(125,45);
  // ctx.lineTo(45,125);
  // ctx.closePath();
  // ctx.stroke();

  // ctx.beginPath()
  // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
  // 圆心为(x,y), 半径为radius, 开始弧度startAngle
  // 结束弧度endAngle，默认顺时针anticlockwise，true为逆时针，false为顺时针
  // 弧度：(Math.PI / 180) * degrees
  // ctx.arc(75, 75, 50, 0, Math.PI * 2, true)
  // // 移动笔触
  // ctx.moveTo(110, 75)
  // ctx.arc(75, 75, 35, 0, Math.PI, false) // 顺时针
  // ctx.moveTo(65, 65)
  // ctx.arc(60, 65, 5, 0, Math.PI * 2, true)
  // ctx.moveTo(95, 65)
  // ctx.arc(90, 65, 5, 0, Math.PI * 2, true)
  // ctx.stroke()

  var raf
  var ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    radius: 25,
    color: 'blue',
    draw: function () {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fillStyle = this.color
      ctx.fill()
    }
  }

  function draw () {
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 长尾效果
    ctx.fillStyle = 'rgba(255,255,255,0.3)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ball.draw()
    ball.x += ball.vx
    ball.y += ball.vy
    // 垂直加速度
    ball.vy *= .99
    ball.vy += .25

    // 边界
    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
      ball.vy = -ball.vy
    }
    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
      ball.vx = -ball.vx
    }
    raf = window.requestAnimationFrame(draw)
  }

  canvas.addEventListener('mouseover', () => {
    raf = window.requestAnimationFrame(draw)
  })

  canvas.addEventListener('mouseout', () => {
    window.cancelAnimationFrame(raf)
  })

  ball.draw()
}
