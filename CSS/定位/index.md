# 定位
position是css布局的核心属性，对元素盒子应用这个属性，可以相对于它在常规文档流中重新定位。position有四个属性，分别是static、relative、absolute、fixed，默认值是static。
HTML

	<p>第一段</p>
	<p>第二段</p>
	<p id="specialpara">第三段(含有ID)</p>
	<p>第四段</p>

##### 1. 静态定位（默认）
在静态定位的情况下，每个元素处在常规文档流中。它们是块级元素，所以就会在页面中自上而下地堆叠起来。

![enter description here][1]

##### 2. 相对定位
添加如下代码，top和left的值可以为负值

	p#specialpara {
		position: relative;
		top: 25px;
		left: 30px;
	}
![enter description here][2]

第三段与它在文档流中的默认位置相比，向下移动了25px，向右移动了30px。相当于它把它自己从原来包含元素（body）中挣脱出来，而且还有一部分跑到屏幕之外。除了这个元素自己相对于原始位置挪动了一下之外，页面没有发生任何变化。换句话说，这个元素原来占据的空间没有动。

##### 3. 绝对定位
绝对定位会把元素彻底从文档流中拿出来。

	p#specialpara {
		position: absolute;
		top: 25px;
		left: 30px;
	}

![enter description here][3]

元素之前占据的位置被“回收了”。说明，绝对定位的元素完全脱离了常规文档流，它现在相当于顶级元素body在定位。

在这里由于绝对定位上下文是body，所以在页面滚动的时候，为了维护与body之间的相对位置关系，它会相应的移动

##### 4. 固定定位
使用固定定位，也会使元素脱离标准文档流，与绝对定位的区别在于，它的定位上下文是视口（浏览器窗口或移动端屏幕），所以不是随页面滚动而改变，一般用于创建不随页面滚动而移动的导航元素。

	p#specialpara {
		position: fixed;
		top: 25px;
		left: 30px;
	}
	
	![enter description here][4]

##### 5. 定位上下文
把元素的position属性设定为relative、absolute或fixed后，继而可以使用top、right、bottom和left属性，相对于另一个元素移动该元素的位置。这里的另一个元素就是定位上下文。

绝对定位元素的任何祖先元素都可以成为它的定位上下文，只要把相应祖先元素的position设定为relative即可。

	<div id="outer">
		<div id="inner">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</div>
	</div>
	
	
没有将`#outer`设置relative时，`#inner`以body为定位上下文

	#outer{
		width: 250px;
		margin: 50px 40px;
		border-top: 3px solid red;
	}
	#inner{
		position: absolute;
		top: 10px;
		left: 20px;
		background: #ccc;
	}

![enter description here][5]

添加`relative`

	#outer{
		position: relative;
		width: 250px;
		margin: 50px 40px;
		border-top: 3px solid red;
	}
	#inner{
		position: absolute;
		top: 10px;
		left: 20px;
		background: #ccc;
	}
	
	
以#outer为定位上下文

![enter description here][6]


  [1]: ./images/1.png "1.png"
  [2]: ./images/2.png "2.png"
  [3]: ./images/3.png "3.png"
  [4]: ./images/4.png "4.png"
  [5]: ./images/5.png "5.png"
  [6]: ./images/6.png "6.png"