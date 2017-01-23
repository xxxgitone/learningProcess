const checkboxs = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(e) {
	let inBetween = false;

	if(e.shiftKey && this.checked){
		checkboxs.forEach(checkbox => {
			console.log(checkbox)
			if (checkbox === this || checkbox === lastChecked) {
				inBetween = !inBetween;
				console.log('starting to check them inbetween')
			}

			if (inBetween) {
				checkbox.checked = true;
			}
		})
	}

	lastChecked = this;
}
checkboxs.forEach(checkbox => checkbox.addEventListener('click', handleCheck));