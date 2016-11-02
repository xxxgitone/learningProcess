#z-index属性
属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。
###属性值
* z-index：auto;	默认
* z-index：<integer>;整数，可为负值
* z-index：inherit;继承

###特性
* 支持负值
* 支持css3 animation动画
* 在css2.1时代，需要和定位元素配合使用

###使用
#####3.1如果z-inde没有发生嵌套
*	后来居上原则

		<img src="js.jpg" style="position: absolute;">
		<img src="js1.png" style="position: relative; ">
	第二个在上
*	哪个大，哪个上

		<img src="js.jpg" style="position: absolute;z-index: 2;">
		<img src="js1.png" style="position: relative; z-index:1;">
	第一个在上

#####3.2如果有嵌套，则遵循祖先优先原则

		<div style="position:relative;z-index: 1;">
			<img src="js.jpg" style="position: absolute;z-index: 2;">
		</div>
		<div style="position:relative;z-index: 1;">
			<img src="js1.png" style="position: relative; z-index:1;">
		</div>

第二个在上，前提：z-index是数值，不是auto

	<div style="position:relative;z-index: auto;">
		<img src="js.jpg" style="position: absolute;z-index: 2;">
	</div>
	<div style="position:relative;z-index: 1;">
		<img src="js1.png" style="position: relative; z-index:1;">
	</div>
第一个在上

css2.1：(z-inde：auto)当前层叠上下文的生成盒子层叠水平是0，盒子（除非是根元素）不会创建一个新的层叠上下文

###4.层叠上下文和层叠水平
#####4.1定位元素默认z-index：auto可以看成是z-index：0
#####4.2.z-index不为auto的定位元素会创建层叠上下wen
#####4.3.z-index的层叠顺序的比较止步于父级层叠上下文