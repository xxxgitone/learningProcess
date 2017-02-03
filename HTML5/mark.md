#HTML5
HTML5的书写规范和标签使用

##1. 大纲算法

* 在 HTML5 中有一个很重要的概念，叫做 HTML5 大纲算法(HTML5 Outliner)，它的用
途是为用户提供一份页面的信息结构目录
* 合理的使用 HTML5 元素标签，可以生成一个非常清晰的文档大纲
* 测试工具：[https://gsnedders.html5.org/outliner/](https://gsnedders.html5.org/outliner/ "Markdown")

##2. div、section、nav、header

* div 元素在 html5 之前就是非常常用的标签，它本身没有任何语义，用来页面布局和
CSS 样式以及 JS 调用
* 如果是页面布局，且不是 header、footer 之类的专属区域，都应该使用 div
* 如果只是单纯的对一个端内容进行 CSS 样式定义，那么也应该使用 div
* 如果想对一段内容进行 JS 控制，那么也应该使用 div
* html5 中，section 并不是用来取代 div 的。它是具有语义的文档标签。表示一段文档中的章节，比如包含一个标题和一个段落，而大纲规范中，至少要包含一个标题。
* nav 元素，这个元素本质上是用来存放一组作为导航的链接，比如 ul
* header 元素不需要强制标题 h1 ~ h6，如果有标题，算 body 的
* section 和 nav 元素大纲要求有标题 h1 ~ h6，但 section 必须有才规范，而 nav
如果没有标题，也是合理的。当然，添加上标题会让大纲更加好看，页面中可以隐藏。
* body，section，nav需要h1~h6的大纲，body，header，div不需要