# 背景
背景支持为元素添加背景颜色和背景图片。元素盒子的图层可以想象成三维透视图，最底下一层为背景颜色，中间一层为背景图片，最上一层为盒子的内容（如文本或图片等）
### 1.css背景属性
* `background-color`： 背景样色
* `background-image`： 背景图片
* `background-repeat`： 背景重复
* `background-position`
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
使用background-image属性

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

  [1]: ./images/1.png "1.png"
  [2]: ./images/2.png "2.png"
  [3]: ./images/3.png "3.png"