# 清除浮动的三种方法
HTML

	<section>
		<img src="avatar.png">
		<p>It's fun to float.</p>
	</section>
	<footer>
		Here is the footer element that runs across the bottom of the page.
	</footer>
	
css

	section {
		border: 1px solid blue;
		margin: 0 0 10px 0;
	}
	p {
		margin: 0;
	}
	footer {
		border: 1px solid red;
	}
![enter description here][1]
在没有添加浮动之前，section包住图片和段落文字，在添加浮动后，图片脱离了文档流，section不在包住图片。只包围非浮动元素，并且footer也被提上去了

	img {
		float: left;
	}

![enter description here][2]

有时候并不希望出现这种情况，可以使用下面三种方法来清除浮动：

##### 方法一：为父元素添加 `overflow:hidden`
为父元素添加`overflow:hidden`，已强制它包围浮动元素，缺点就是不太直观

	section {
		border: 1px solid blue;
		margin: 0 0 10px 0;
		overflow: hidden;
	}

添加后效果

![enter description here][3]

> `overflow:hidden`声明的真正用途是防止包含元素被超大内容撑开来。应用这个属性后，包含元素依然保持其设定的高度，而超大的子内容则会被容器裁剪掉。除此之外，`overflow:hidden` 还有另外一个作用，即它能可靠的迫使父元素包含其浮动的子元素

##### 方法二：同时浮动父元素
添加如下代码

	section {
		border: 1px solid blue;
		margin: 0 0 10px 0;
		float: left;
		width:100%;
	}
	img {
		float: left;
	}
	p {
		margin: 0;
	}
	footer {
		border: 1px solid red;
		clear: left;
	}
	
浮动section后，不管其子元素是否浮动，它都会紧紧地包围住它的子元素。因此需要`width:100%`再让section与浏览器同宽。另外，由于section现在浮动了，所以footer会努力往上挤到他旁边。为了强制footer依然呆在section下面，要给它应用`clear:left`.被清除的元素不是被提升到浮动元素的旁边。

##### 方法三：添加非浮动的清除元素
第三种方式强制父元素包含其浮动子元素的方法，就是给父元素的最后添加一个非浮动的子元素，然后清除该子元素。由于包含元素一定会包围非浮动的子元素，而且清除会让这个子元素位于（清除一侧）浮动元素的下方，因此包含元素一定会包含这个子元素——以及前面的浮动元素。也有两种方式

* 不太理想，就是简单的在HTML标记中添加一个子元素，并给它应用clear属性。

		<section>
				<img src="doge.jpeg">
				<p>It's fun to float.</p>
				<div class="clear_me"></div>
			</section>
			<footer>
				Here is the footer element that runs across the bottom of the page.
			</footer>
			
	添加样式

		section {
			border: 1px solid blue;
			margin: 0 0 10px 0;
		}
		img {
			float: left;
		}
		.clear_me{
			clear: left;
		}
		footer {
			border: 1px solid red;
		}
		
* 添加一个类

		<section class="clearfix">
				<img src="doge.jpeg">
				<p>It's fun to float.</p>
		</section>
		
	类的样式为
	
		.clearfix:after {
			content: ".";
			display: block;
			height: 0;
			visibility: hidden;
			clear: both;
		}

  [1]: ./images/1.png "1.png"
  [2]: ./images/2.png "2.png"
  [3]: ./images/3.png "3.png"