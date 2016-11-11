/**
 * 这个模块注册一个可在页面加载完成后自动运行匿名函数，当执行这个函数的时候会去文档中查找
 * id为“TOC”的元素。如果这个元素不存在，就新建一个
 *
 * 生成的TOC目录应当具有自己的css样式，整个目录区域的样式className设置为“TOCEntry”，同样我们
 * 为不同层级的目录标题定义了不同的样式，<h1>标签生成的标题className为“TOCLevel1”，以此类易标号的样式
 * 为TOCLevelNum
 */

//注册函数f，当文档载入完成时执行这个函数
//如果文档已经载入完成，尽快以异步的方式执行它
function onLoad(f){
	if(onLoad.loaded)     //如果文档载入完毕
		window.setTimeout(f,0);	//将f放入异步队列，并尽快执行
	else if(window.addEventListener)		//注册事件标准方法
		window.addEventListener('load',f,false);	
	else if(window.attachEvent)		//IE8以及更早的IE版本浏览器注册事件
		window.attachEvent('onload',f);
}
//给onLoad设置一个标志。用来指示文档是否载入完成
onLoad.loaded=false;
//注册一个函数，当文档载入完成时设置这个标志
onLoad(function(){
	onLoad.loaded=true;
})

onLoad(function () {
	//查找TOC容器元素
	//如果不存在，则在文档开头创建一个
	var toc=document.getElementById('TOC');
	if(!toc){
		toc=document.createElement('div');
		toc.id='TOC';
		document.body.insertBefore(toc,document.body.firstChild);
	}

	//查找所有标题元素
	var headings;
	if(document.querySelectorAll)
		headings=document.querySelectorAll('h1,h2,h3,h4,h5,h6');
	else
		headings=findHeadings(document.body,[]);

	//遍历document的body，查找标题元素
	function findHeadings(root,sects){
		for(var c=root.firstChild;c!=null;c=c.nextSibling){
			if(c.nodeType!==1) continue;
			if(c.tagName.length==2&&c.tagName.charAt(0)=='H')
				sects.push(c);
			else
				findHeadings(c,sects);
		}
	}
	// 初始化一个数组来保持跟踪章节号
	var sectionNumbers=[0,0,0,0,0,0];

	// 循环已经找到的标题元素
	for (var h = 0; h < headings.length; h++) {
		var heading=headings[h];

		// 跳过已经在TOC中的元素
		if(heading.parentNode==toc) continue;

		//判定标题的级别
		var level=parseInt(heading.tagName.charAt(1));
		if(isNaN(level)||level<1||level>6) continue;

		//对于该标题级别增加sectionNumbers对应的数字
		//重置所有标题比它级别低的数字为0
		sectionNumbers[level-1]++;
		for(var i=level;i<6;i++) sectionNumbers[i]=0;

		//将所有标题级别的章节号组合产生一个章节号 如2.3.1
		var sectionNumber=sectionNumbers.slice(0,level).join('.');

		//为标题级别增加章节号
		//把数字放在span中，使得其可以用样式修饰
		var span=document.createElement('span');
		span.className='TOCSectNum';
		span.innerHTML=sectionNumber;
		heading.insertBefore(span,heading.firstChild);

		//用命名锚点将标题包起来，以便它增加链接
		var anchor=document.createElement('a');
		anchor.name='TOC'+sectionNumber;
		heading.parentNode.insertBefore(anchor,heading);
		anchor.appendChild(heading);

		//为该节点创建一个链接
		var link=document.createElement('a');
		link.href='#TOC'+sectionNumber;
		link.innerHTML=heading.innerHTML;

		//将链接放在一个div中，div用基于级别名字的样式修饰
		var entry=document.createElement('div');
		entry.className='TOCEntry TOCLevel'+level;
		entry.appendChild(link);

		//将div添加进TOC容器中
		toc.appendChild(entry);

	}
})