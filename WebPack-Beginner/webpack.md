#WebPack入门
###1.什么是webpack？
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。
###2.安装和使用
* 全局安装webpack

		$ npm install webpack -g
*	在项目目录下使用命令生成package.json文件（也可自己手动创建），输入此命令会出现一些信息，按提示填好即可

 		npm init
* 在项目中安装webpack依赖(window下的安装命令，其他系统有所不同，)有些会有警告，忽略即可

	 	$ npm install webpack --save-dev
