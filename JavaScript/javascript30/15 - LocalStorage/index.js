const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
//获取本地存储数据，没有的话新建
const items = JSON.parse(localStorage.getItem('items')) || [];

//1.表单提交后处理函数，获取表单内容
function addItem(e) {
	e.preventDefault();
	const text = (this.querySelector('[name=item]')).value;

	const item = {
		text: text,
		done: false
	}

	items.push(item);
	populateList(items, itemsList);
	//存储在本地，前一个items为key，后一个items为value,为字符串形式，json格式
	localStorage.setItem('items', JSON.stringify(items));
	this.reset();
}

// 2.显示列表
function populateList(plates = [], platesList) {
	platesList.innerHTML = plates.map((plate, i) => {
		return `
			<li>
				<input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
				<label for="item${i}">${plate.text}</label>
			</li>
		`;
	}).join('');
}

//保存复选框的选中情况
function toggleDone(e) {
	//这里的e.target包含label，和input，匹配input
	if (!e.target.matches('input')) return;
	const el = e.target;
	const index = el.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);


//如果本地有数据的话，直接显示
populateList(items, itemsList);


// const checkBoxes = document.querySelectorAll('input');
// //新增一个item后，这个绑定事件将失效
// checkBoxes.forEach(input => input.addEventListener('click', () => alert('hi')));