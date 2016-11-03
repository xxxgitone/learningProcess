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

###3.1z-index与定位元素
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
* 定位元素默认z-index：auto可以看成是z-index：0
* z-index不为auto的定位元素会创建层叠上下文
* z-index的层叠顺序的比较止步于父级层叠上下文

######为什么定位元素会覆盖普通元素
	<img src="js.jpg" >
	<img src="js1.png" style="margin-left: -60px;">
第二张在上，后来居上原则

	<img src="js.jpg" style="position: relative;">
	<img src="js1.png" style="margin-left: -60px;">
第一个在上，此时z-index为auto

######z-index与创建层叠上下文
不是auto的时候会创建层叠上下文

	<div style="width:100px;height: 200px;background-color: blue;position:absolute;">
		<img src="js1.png" style=" position:relative;margin-left: -60px;">
	</div>
图片在上，后来居上

	<div style="width:100px;height: 200px;background-color: blue;position:absolute;">
		<img src="js1.png" style=" position:relative;margin-left: -60px;z-index: -1;">
	</div>
div在上，此时图片的层叠上下文是html或者body元素

	<div style="width:100px;height: 200px;background-color: blue;position:absolute;z-index: 0;">
		<img src="js1.png" style=" position:relative;margin-left: -60px;z-index: -1;">
	</div>
图片在上：因为一旦给容器z-index设置为数值，图片的层叠上下文就成了容器。此时图片z-index虽为负值，但却在层叠上下文之上

从层叠顺序上来看z-index：auto和z-index：0相同；但是从层叠上下文来讲，有本质差别，auto不会创建层叠上下文，0会创建（IE7除外）

######z-index受限于层叠上下文

	<div style="position:relative;z-index: 0;">
		<img src="js1.png" style=" position:absolute;z-index: 9999999;">
	</div>
	
	<div style="position:relative;z-index: 1;">
		<img src="js.jpg" style=" position:absolute;z-index: -1;">
	</div>

第二个在上

###5.其他css属性和层叠上下文


