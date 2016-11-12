//shake将元素从一边到另一边快速移动或震动
//fadeOut通过指定时间降低元素不透明度，使得元素淡入或者淡出
/**
 * 将e转换为相对定位的元素，使之左右震动
 * @param  {Object} e          可以是元素对象或者元素的id
 * @param  {Function} oncomplete 函数，以e为参数，它将在动画结束时调用
 * @param  {Number} distance   指定e震动的距离，默认时5像素
 * @param  {Number} time      震动多久，默认500毫秒
 */
function shake(e, oncomplete, distance, time) {
	if (typeof e === 'string') e = document.getElementById(e);
	if (!time) time = 500;
	if (!distance) distance = 5;

	var originalStyle = e.style.cssText; //保存e的原始style,内联样式
	e.style.position = 'relative'; //使e相对定位
	var start = (new Date()).getTime(); //注意，动画开始的时间
	animate(); //动画开始

	//函数检验消耗的时间，并更新e的位置
	//如果动画完成，将e还原为原始位置
	//否则，更新e的位置，安排它自身重新运行
	function animate() {
		var now = (new Date()).getTime(); //获取当前时间
		var elapsed = now - start; //从开始以来消耗了多久时间
		var fraction = parseFloat(elapsed / time); //是总时间的几分之几
		if (fraction < 1) { //如果动画为完成
			//作为动画完成比例的函数，计算e的x位置
			//使用正弦函数将完成比例乘以4pi
			//所以，它来回往复两次
			var x = distance*Math.sin(fraction*4*Math.PI);
			e.style.left = x + 'px';
			//在25毫秒后或在总时间的最后尝试再次运行函数
			//目的是产生每秒40帧的动画
			setTimeout(animate, Math.min(25, time - elapsed));
		} else {
			e.style.cssText = originalStyle;
			if (oncomplete) {
				oncomplete(e);
			}
		}
	}
}

/**
 * 以毫秒级别的时间将e从完全不透明淡出到完全透明
 * 在调用函数时假设e是完全不透明的
 * oncomplete是一个可选函数，以e为参数，将在动画结束后调用
 * 如果不指定time，默认500毫秒
 * 该函数不能再旧版IE中运行，但可以修改
 * 除了opacity，IE用非标准的filter属性
 * @param  {[type]} e          [description]
 * @param  {[type]} oncomplete 函数，以e为参数，它将在动画结束时调用
 * @param  {[type]} time       [description]
 */
function fadeOut(e, oncomplete, time) {
	if (typeof e === 'string') e = document.getElementById(e);
	if (!time) time = 500;

	var ease = Math.sqrt;

	var start = (new Date()).getTime(); //注意，动画开始的时间
	animate();

	function animate(){
		var now = (new Date()).getTime(); //获取当前时间
		var elapsed = now - start; //从开始以来消耗了多久时间
		var fraction = elapsed / time; //是总时间的几分之几

		if(fraction<1){
			var opacity=1-ease(fraction); //计算元素的不透明度
			e.style.opacity=String(opacity);
			setTimeout(animate,Math.min(25,time-elapsed)); //调度下一帧
		}else{//否则动画完成
			e.style.opacity='0';
			if (oncomplete) {
				oncomplete(e);
			}
		}
	}


}