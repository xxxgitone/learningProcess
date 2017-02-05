const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');

document.body.appendChild(highlight);

function highlightLink() {
	//Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
	const linkCoords = this.getBoundingClientRect();
	console.log(linkCoords)
	const coords = {
		width: linkCoords.width,
		height: linkCoords.height,
		left: linkCoords.left + window.scrollX,
		top: linkCoords.top + window.scrollY
	}
	highlight.style.width = `${coords.width}px`;
	highlight.style.height = `${coords.height}px`;
	highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));









