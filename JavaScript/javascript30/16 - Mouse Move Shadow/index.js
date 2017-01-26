const hero = document.querySelector('.hero');
const text = document.querySelector('h1');
const walk = 500;

function shadow(e) {
  // const width = hero.offsetWidth;
  // const height = hero.offsetHeight;

  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;
  // console.log(this, e.target)
  // offsetX是相对于触发事件的x坐标
  // 在这里如果将鼠标放在标题外，则以div#hero为触发事件
  // 鼠标放在标题内，则以h1为触发事件
  if (this !== e.target) {//当鼠标放在标题内的时候，this为div#hero
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)

  `;
}

hero.addEventListener('mousemove', shadow);