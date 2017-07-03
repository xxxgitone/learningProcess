window.onload = () => {
  
  const canvas = document.getElementById('sky')
  const context = canvas.getContext('2d')

  // 设置canvas画布的宽高
  const W = window.innerWidth
  const H = window.innerHeight
  canvas.width = W
  canvas.height = H

  const mf = 100 // max flakes 雪花的最大数量
  let flakes = []

  for (let i = 0; i < mf; i++) {
    flakes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 5 + 2, // 2~7px之间
      d: Math.random() + 1 // 雪花密度
    })
  }

  // 绘制雪花
  function drawFlakes () {
    context.clearRect(0, 0, W, H)
    context.fillStyle = 'white'
    context.beginPath()
    for (var i = 0; i < mf; i++) {
      const f = flakes[i]
      context.moveTo(f.x, f.y)
      context.arc(f.x, f.y, f.r, 0, Math.PI * 2, true)
    }
    context.fill()
    moveFlakes()
  }

  // 雪花飘落动画
  let angle = 0

  function moveFlakes () {
    angle += 0.01
    for (let i = 0; i < mf; i++) {
      const f = flakes[i]

      f.x += Math.sin(angle) * 2
      f.y += Math.pow(f.d, 2) + 1

      // 当雪花飘落到底部， 让它回到顶部
      if (f.y > H) {
        flakes[i] = {
          x: Math.random() * W,
          y: 0,
          r: f.r,
          d: f.d
        }
      }
    }
  }

  setInterval(drawFlakes, 25)
}