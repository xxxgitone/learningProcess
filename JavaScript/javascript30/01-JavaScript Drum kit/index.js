function playSound(e) {
	// console.log(e.keyCode);
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	if (!audio) return;
	audio.currentTime = 0; //重新开始
	audio.play();
	key.classList.add('playing');//增加一个类
}

function removeTransition(e) {
	// console.log(e);
	if(e.propertyName != 'transform') return;
	// console.log(e.propertyName);
	this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
// transitionend 事件会在 CSS transition 结束后触发. 
// 当transition完成前移除transition时，比如移除css的transition-property 属性，事件将不会被触发.如在transition完成前设置 display: none，事件同样不会被触发.
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);