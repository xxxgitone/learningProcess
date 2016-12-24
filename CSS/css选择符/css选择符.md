#css选择符

###1.上下文选择符
上下文选择符的格式,标签之间用**间隔**空开
	
	标签1 标签2 {声明}

标签2是我们想要选择的目标，而且只有在标签1是其祖元素（不一定是父元素）的情况下才会被选中

	article p {font-weight:bold}

看一下代码

	<article>
		<h1>Contexttual selectors are <em>very</em> selective</h1>
		<p>this example shows how to target a <em>specific</em> tag.</p>
	</article>

这样写两个em都会受到影响

	article em{
		color: green;
	}

指定h1下em或p中的em颜色

	article h1 em{
		color: green;
	}

	article p em{
		color: green;
	}


###1.2 特殊的上下文选择符
如下代码

	<section>
		<h2>An H2 Heading</h2>
		<p>This is paragraph 1</p>
		<p>Paragrap 2 has <a href="#">a link</a> in it.</p>
		<a href="#">link</a>
	</section>
######1.2.1子选择符
	标签1 > 标签2

标签2必须是标签1的子元素。标签1不能是标签2其他的祖先元素

	section > h2 {
		font-style: italic;
	}

######1.2.2紧邻同胞选择符 `+`
	标签1 + 标签2
标签2必须是紧跟在其同胞标签1的后面

	h2 + p{
		/*把段落设置为小型大写字母字体*/
		font-variant: small-caps;
	}

######1.2.3 一般同胞选择符 `~`
	标签1 ~ 标签2

标签2必须跟（不一定紧跟）在其同胞标齐1后

	h2 ~ a{
		color: red;
	}

#######1.2.4 通用选择符 `*`
同用符*是一个通配符，它匹配任何元素

*{color:green}

上面语句表示所有元素(文本)变为green