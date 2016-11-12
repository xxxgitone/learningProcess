
//滚动条的位置
//以一个对象的x和y属性的方式返回滚动条的偏移量
//当滚动条向下或者向右移动了
function getScrollOffsets(w) {
	//使用指定窗口，如果不带参数则使用当前窗口
	w = w || window;

	//除了IE8及更早的版本，其他都能用
	if (w.pageXOffset != null)
		return {
			x: w.pageXOffset,
			y: w.pageYOffset
		};

	//对标准模式下的IE(或任何浏览器)
	var d = w.document;
	if (document.compatMode == 'CSS1Compat')
		return {
			x: d.documentElement.scrollLeft,
			y: d.documentElement.scrollTop
		};

	//怪异模式的浏览器
	return {
		x: d.body.scrollLeft,
		y: d.body.scrollTop
	};
}
/**
 * 
 * @param  elementToDrag 接受mousedown事件的元素或者某些包含元素
 *         				它必须是绝对定位的元素
 *         				它的style.left和style.top值将随着用户的拖动而改变
 * @param   event         mousedown事件对象
 */
function drag(elementToDrag, event) {
	//初始鼠标位置，转换为文档坐标
	var scroll = getScrollOffsets();
	var startX = event.clientX + scroll.x;
	var startY = event.clientY + scroll.y;
	//在文档坐标下，待拖拽的元素初始位置
	//因为elementToDrag是绝对定位的
	//所以我们可以假设offsetParent就是文档的body元素
	var origX = elementToDrag.offsetLeft;
	var origY = elementToDrag.offsetTop;

	//计算mousedown事件和元素和元素左上角之间的距离
	//我们将它保存为鼠标移动的距离
	var deltaX = startX - origX;
	var deltaY = startY - origY;

	//注册用于相应接着mousedown事件发生的mousemove和mouseup事件的事件处理程序
	if (document.addEventListener) { //标准事件模型
		//在document对象上注册捕获事件处理程序
		document.addEventListener('mousemove', moveHandler, true);
		document.addEventListener('mouseup', upHandler, true);
	} else if (document.attachEvent) { //用于IE5~IE8的事件模型
		//在IE事件模型中
		//捕获事件是通过调用元素上的setCapture捕获它们
		elementToDrag.setCapture();
		elementToDrag.attachEvent('onmousemove', moveHandler);
		elementToDrag.attachEvent('onmouseup', moveHandler);
		//作为mouseup事件看待鼠标捕获的丢失
		elementToDrag.attachEvent('onlosecapture', upHandler);
	}
	//处理这个事件，不让任何元素看到他
	if (event.stopPropagation) event.stopPropagation(); //标准
	else event.cancelBubble = false;

	//阻止默认行为
	if (event.preventDefault) event.preventDefault(); //标准
	else event.returnValue = false;

	//处理事件
	function moveHandler(e) {
		if (!e) e = window.event;

		var scroll = getScrollOffsets();
		elementToDrag.style.left = (e.clientX + scroll.x - deltaX)+'px';
		elementToDrag.style.top = (e.clientY + scroll.y - deltaY)+'px';

		if (e.stopPropagation) e.stopPropagation(); //标准
		else e.cancelBubble = true;

	}

	function upHandler(e) {
		if (!e) e = window.event;

		if (document.removeEventListener) { //标准事件模型
			//在document对象上注册捕获事件处理程序
			document.removeEventListener('mousemove', moveHandler, true);
			document.removeEventListener('mouseup', upHandler, true);
		} else if (document.detachEvent) { //用于IE5~IE8的事件模型
			elementToDrag.detachEvent('onlosecapture', moveHandler);
			elementToDrag.detachEvent('onmouseup', moveHandler);
			elementToDrag.detachEvent('onmousemove', upHandler);
			elementToDrag.releaseCapture();
		}

		if (e.stopPropagation) e.stopPropagation(); //标准
		else e.cancelBubble = true;
	}
}