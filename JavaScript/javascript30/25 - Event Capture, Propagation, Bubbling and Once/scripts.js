const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

function logText(e) {
	console.log(this.classList.value);
	e.stopPropagation();
	// console.log(this);

}

divs.forEach(div => div.addEventListener('click', logText, {
	capture: false,
}));

button.addEventListener('click', () => {
	console.log('Click!!!');
}, {
	once:true
})