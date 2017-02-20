# 背景
背景支持为元素添加背景颜色和背景图片。元素盒子的图层可以想象成三维透视图，最底下一层为背景颜色，中间一层为背景图片，最上一层为盒子的内容（如文本或图片等）
### 1.css背景属性
* `background-color`： 背景样色
* `background-image`： 背景图片
* `background-repeat`： 背景重复
* `background-position`： 背景位置
* `background-size`
* `background-attachment`
* `background`（简写属性）
* `background-clip`
* `background-origin`
* `background-break`

### 2. 背景样色
设置背景颜色，通过`background-color`属性。

	body {
		background-color: #caebff;
	}
	p {
		font-family: helvetica, arial, sans-serif;
		font-size: 18px;
		width: 350px;
		margin: 20px auto;
		padding: 10px;
		background-color: #fff;
		color: #666;
		border: 4px solid;
	}

![enter description here][1]

body的背景色是蓝绿色，段落的背景色为白色，前景色color为灰色，前景色可以影响文本，也影响边框（border没有设置颜色的前提下）

### 3. 背景图片
使background-image属性

	p {
		font-size: 28px;
		font-family: helvetica, arial, sans-serif;
		width: 400px;
		height: 110px;
		margin: 20px auto;
		padding: 10px;
		color: #000;
		border: 4px solid #aaa;
		background-color: #fff;
		background-image: url(images/blue_circle.png);
	}

![enter description here][2]

默认情况下背景图片会以左上角为起点，沿水平和垂直方向重发出现，最终填满整个背景区域。

### 4.背景重复
控制背景重复方式的`background-repeat`属性有4个值，默认是`repeat`，效果就是水平和垂直方向都重复，直到填满整个盒子。其他如下图所示

![enter description here][3]

CSS3还有两个属性，有些浏览器还不支持，用来控制背景图片重复确切的次数，即所有图片都是完整的，不会出现半张图片的现象。

* `background-repeat:round`：为确保图片不被裁剪，通过调整图片大小来适应背景区域
* `background-repeat:space`：为确保图片不被裁剪，通过在图片间添加空白来使用背景区域

### 5.背景位置
background-position用于控制背景位置，有5个关键字值，分别是top、left、bottom、right和center。这些关键字中的任意两个组合起来都可以作为该属性的值。比如，top right表示把图片放在元素的右上角位置，center center把图片放在元素的中心位置	。

background-position同时设定元素和图片的原点。原点决定了元素和图片中某一点的水平和垂直坐标。默认情况下，background-position的原点位于左上角。换句话说，元素的左上角和图片的左上角是对齐的，随后图片向各个方向重复，都是以左上角为起点。

![enter description here][4]

改为center后

![enter description here][5]

也可以使用百分比的方式设置

	p {
		height: 150px;
		width: 250px;
		border: 2px solid #aaa;
		margin: 20px auto;
		text-align: center;
		line-height: 150px;
		background-image: url(images/turq_spiral_150.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
	}

![enter description here][6]

> 背景位置的值

* 设定背景位置可以使用三种值：关键字、百分比、绝对或相对单位的数值。可以使用两个值分别设定水平和垂直位置。
* 关键字的顺序不重要，`left bottom` 和 `bottom left`意思相同。最好不要混用关键字和数值。
* 使用数值时，第一个表示水平位置，第二个表示垂直位置。要是只设定一个值，则将其用来设定水平位置，垂直位置为center。
* 在使用关键字和百分比值的情况下，设定的值同时应用于元素和图片。即如果设定了`33% 33%`， 则图片水平33%的位置与元素水平33%的位置对齐。垂直方向也是一样。
* 像素之类的绝对单位就不一样，使用像素单位来设定位置，那么图片的左上角会被放在距离元素左上角指定的位置
* 可以使用负值。


  [1]: ./images/1.png "1.png"
  [2]: ./images/2.png "2.png"
  [3]: ./images/3.png "3.png"
  [4]: ./images/4.png "4.png"
  [5]: ./images/5.png "5.png"
  [6]: ./images/6.png "6.png"