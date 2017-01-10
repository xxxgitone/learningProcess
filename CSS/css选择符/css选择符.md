+666666666666666666 # css选择符

### 1.上下文选择符
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


### 2. 特殊的上下文选择符
如下代码

	<section>
		<h2>An H2 Heading</h2>
		<p>This is paragraph 1</p>
		<p>Paragrap 2 has <a href="#">a link</a> in it.</p>
		<a href="#">link</a>
	</section>
##### 2.1子选择符
	标签1 > 标签2

标签2必须是标签1的子元素。标签1不能是标签2其他的祖先元素

	section > h2 {
		font-style: italic;
	}

##### 2.2紧邻同胞选择符 `+`
	标签1 + 标签2
标签2必须是紧跟在其同胞标签1的后面

	h2 + p{
		/*把段落设置为小型大写字母字体*/
		font-variant: small-caps;
	}

##### 2.3 一般同胞选择符 `~`
	标签1 ~ 标签2

标签2必须跟（不一定紧跟）在其同胞标齐1后

	h2 ~ a{
		color: red;
	}

##### 2.4 通用选择符 `*`
同用符*是一个通配符，它匹配任何元素

*{color:green}

上面语句表示所有元素(文本和边框)变为green

	p *{
		color:red;
	}
上面代码会将p包含的所有元素的文本变成红色，即将a标签的文本变红

	section * a{
		font-size: 1.3em;
	}
此代码会将section的孙子元素选中，即孙子a标签选中

### 3. ID和类选择器
id和class属性不能以数字和特殊符号开头
#####3.1 类属性
如下代码

	<h1 class="specialtext">
			This is a heading with the <span>same class</span> as the second paragraph.
		</h1>
		<p>
			This tag has no class.
		</p>
		<p>
			When a tag has a class attribute,you can target it <span>regardless</span> of its position in 
			the hierarchy.
		</p>

1.类选择符

	.类名
设置类属性

	.specialtext{
		font-style: italic;
	}

2.标签带类选择符

	p.specialtext{
		color: red;
	}

上面代码只能选择带有specialtext的p

	p.specialtext span {
		font-weight: bold;
	}

选择带有specialtext的p下的span标签

3.多类选择符

	.specialtext.features{
		font-size: 120%;
	}

选择同时含有上面两个类名的元素，两个类名之间不能有空格，有空格表示后代选择符了，即上下文

#####3.2 ID属性
	#ID
即

	#specialtext{css样式声明}
或者

	p#specialtext{css样式声明}
**用于页内导航的ID**

* ID可以用在页内导航链接中。用于跳转到本页中含有此ID的位置

		<a href="#bio">Biograph</a>
* href中只含有`#`时，会跳转到本页面的顶部

		<a href="#b">Back to top</a>

##### 3.3 什么时候用ID，什么时候用类
1.什么时候用ID

ID的用途是在页面中唯一地标识一个元素。同一个页面中的每一个ID属性，都必须有独一无二的值。就是每个ID在页面中只能使用一次。如可以使用唯一的ID表示主菜单

	<nav id="mainmenu">
		<ul>
			<li><a href="#">Yin</a></li>
			<li><a href="#">Chun</a></li>
		</ul>
	</nav>

有了用唯一ID标识的菜单后，就可以使用上下文选择符选择其中包含的各种类型的标签了。
利用唯一的ID，可以在css中方便的定位到这个元素，以及它的子元素。通常我们会给页面中的每个顶级区域都添加一个一个ID

2.什么时候使用class
类的目的是为了标识一组具有相同特征的元素。可以给多个元素使用相同的类。
不要滥用类，可以使用继承和上下文选择符。

###4.属性选择符
基于HTML标签的属性选择元素
#####4.1 属性名选择符
	标签名[属性名]

比如

	img[title]{
		border:2px solid blue
	}

上面代码会选中含有title属性的img标签
#####4.2属性值选择器

	标签名[属性名="属性值"]

下面代码
	
	img[title="red"]{
		border:1px solid green;
	}
会选中title属性为red的img标签

### 5.伪类
##### 5.1 UI伪类
1.链接伪类

* link 表示初始状态样式，即没有点击，也没有鼠标悬停
* visited 点击过的状态
* hover 鼠标悬停在链接上的状态
* active 链接正在被点击的状态

		a:hover{color:black;}
		a:visited{color:gray;}
		a:hover{text-decoration:none;}
		a:active{color:red;}
标注：一个冒号(:)表示伪类，两个冒号(::)表示css3新增的伪元素

其中hover伪类可以使用于其他元素

	p:hover{background-color:gray;}

2  `:focus`伪类
表单中的文本字段在用户单击它时会获得焦点，然后用户才能在其中输入字符

	input:focus{border:1px solid blue;} 
上面代码会在光标位于input字段中时，为该字段添加一个蓝色边框

3 `:target`伪类
如果用户点击一个纸箱页面中其他元素的链接，则那个元素就是目标（target），可以用 `:target`伪类选中它

	<a href="#more_info">More Information</a>

上面代码的目标就是含有`id`为`more_info`的元素

	<h2 id="more_info">This is the information you are looking for.</h2>
同时设置css样式

	#more_info:target{
		background: #eee;
	}
那么，当点击了链接时，h2标签的背景将会变成灰色

#####5.2结构化伪类
结构化伪类可以根据标记的结构应用样式

1. `:first-child`和`:last-child`

`:first-child`代表一组同胞元素中的第一个元素，而`:last-child`则代表最后一个

结构代码

	<ol class="results">
		<li>My Fast Poney</li>
		<li>Steady Trotter</li>
		<li>Slow Ol' Nag</li>
	</ol>

css代码

	ol.results li:first-child{
		color: blue;
	}

第一个li的颜色变成蓝色，last-chil用法类似

2. `:nth-child(n)`

	li:nth-child(3)

会选中第三个li

###6. 伪元素
伪元素就是文档中若有实无的元素

1. `::first-letter`

		p::first-letter{font-size:300%;}

可以实现段落首字符放大的效果

2. `::first-line`

可以选中文本段落（一般情况下是段落）的第一行

	p::first-line{
		font-variant:small-caps;
	}
将第一行变成了小型大写字母

3.`::before`和`::after`

可以用于在特定的元素前面或后面添加特殊的内容

如

	<p class="age">25</p>

样式

	p.age::before{
		content:"Age: ";
	}
	p.age::after{
		content: " years.";
	}

效果：

	Age: 25 years.

### 7. 继承
css中的祖先元素会向后代传递css属性值，比如body元素，它是所有元素的祖宗，所有标签都是它的后代

	body{font-family:helvetica,arial,sans-serif;}

那么文档的所有元素，无论它在多么靠后的层次，都将继承这些样式。
css中有很多属性是可以继承的，其中相当一部分都跟文本有关，比如颜色、字体、字号等。也有很多不可以继承的，不能继承的属性主要涉及元素盒子的定位和显示方式，比如边框、外边距、内边距等

### 8. 层叠
##### 8.1 样式来源
* 浏览器默认样式
* 用户样式表
* 作者链接样式表（按照他们链接到页面的先后顺序）
* 作者嵌入样式
* 作者行内样式

浏览器会按照上面的顺序依次检查每个来源的样式，并在有定义的情况下，更新对每个标签属性值的设定。整个检查更新过程结束后，再将每个标签以最终设定的样式显示出来。

##### 8.2 层叠规则

* 层叠规则一：找到应用给每个元素和属性的所有声明
* 层叠规则二：按照顺序和权重排序

	浏览器依次检查5个来源，并设定匹配的属性。如果匹配的属性在下一个来源也有定义，则更新该属性的值，如此循环，直到检查完页面中所有标签受影响属性的全部5个来源为止。最终某个属性被设定为什么值，就用什么值显示

	也可以声明权重。
	
		p{color:green !important; fant-size:12pt;}

	这条代码加重了将文本设置为绿色的权重。就算层叠的下一来源给段落设定了其他颜色，最终颜色还是绿色。
	
* 层叠规则三：按特指度排序，特指度其实表示一条规则有多明确

		p{font-size:12px;}
		p.largetext{font-size:16px;}
		
	那么下面的段落
	
		<p claaa="largetext">A bit of text</p>

	将显示16像素的文本，因为第二条的选择符既包括标签名，也包括类名，所以更加明确，即特指度更高，第二条会覆盖第一条。
	
		p{font-size:12px;}
		.largetext{font-size:16px;}
		
	上面两条语句，显示类选择符的定义的样式。

##### 8.3 计算特指度
一个简单的计分规则，即对每个选择符都要按照下面的‘ICE’公式计算三个值

``` mathematica
	I-C-E
```
针对这个公式的计分方法：

* 选择符中有一个ID，就在I的位置上加1
* 选择符中有一个类，就在c的位置上加1
* 选择符中有一个元素（标签名）名，就在E的位置上加1
* 得到一个三位数

例子：

|  规则|特指度|
| --- | --- |
|  p   |  0-0-1 特指度=1|
| p.largetext|   0-1-1 特指度=11   |
|p#largetext |   1-0-1 特指度=101   |
|body p#largetext |  1-0-2 特指度=102    |
|body p#largetext ul.mylist |   1-1-3 特指度=113   |
|body p#largetext ul.mylist li| 1-1-4 特指度=114|

在此，每个选择符都比前一个选择符的特指度更高。

层叠规则四：**顺序决定权重**。如果两条规则都影响某元素的同一个性质，而且它们的特指度也相同，则位置最靠下（后声明）的规则胜出

> 查理版简单层叠要点

* 规则一：包含ID的选择符胜过包含类的选择符，包含类的选择符，胜过包含标签的选择符
* 规则二：如果几个不同来源都为同一个标签的同一个属性定义了样式，行内样式胜过嵌入样式，嵌入样式胜过链接样式。在链接的样式表中，具有相同特指度的样式，后声明的胜过先声明的。

规则一胜过规则二。换句话说，如果选择符更明确（特指度更高），无论在哪里，都会胜出

* 规则三：设定的样式胜过继承的样式，此时不考虑特指度（即显示设定优先）。

看例子：

	<div class="cascade_demo">
	  <p id="inheritance_fact">Inheritance is <em>weak</em> in the Cascade</p>
	</div>
	
规则：

	div#cascade_demo p#inheritance_fact {color:blue;}
	2-0-2(高特指度)

会导致weak单词变成蓝色，从p继承了这个颜色

设定下面样式

	em{color:red}
	0-0-1(特指度低)

em会变成红色，因为虽然em的特指度低，但em继承的颜色值，会被为它明确指定的颜色值覆盖。



