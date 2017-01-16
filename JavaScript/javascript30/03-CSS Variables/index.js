const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
	// console.log(this.value);
	// console.log(this.dataset);
	// HTMLElement.dataset 属性允许我们访问所有在元素上自定义的data属性 (这种属性一般以data-开头）. 它的结构是一个DOMString映射表，对每一个自定义的数据属性都有一个实体与之对应。
	const suffix = this.dataset.sizing || '';
	// object.setProperty (propertyName, propertyValue, priority);
	// 例子
	//  function ModifyBGColor (button) {
        //     if (button.style.setProperty) {
        //         button.style.setProperty ("background-color", "green", null);
        //     } 
        //     else {
        //         button.style.setAttribute ("backgroundColor", "green");
        //     }
        // }
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

