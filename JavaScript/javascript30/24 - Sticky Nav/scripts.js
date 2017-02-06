const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;

function fixNav(e) {
	if (window.scrollY >= topOfNav) {
		//使文章更靠近导航
		document.body.style.paddingTop = nav.offsetHeight + 'px';
		document.body.classList.add('fixed-nav');
	} else {
		document.body.style.paddingTop = 0;
		document.body.classList.remove('fixed-nav');
	}
}

window.addEventListener('scroll', fixNav);












