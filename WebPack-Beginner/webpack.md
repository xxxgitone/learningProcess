#WebPack入门
###1.什么是webpack？
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。
###2.安装和使用(前提已经安装的Node.js)
* webpack安装
	* 全局安装webpack

			npm install webpack -g

	* 全局安装服务器webpack-dev-server

			npm install webpack-dev-server -g
* webpack配置文件

	在项目根目录下创建一个名为webpack.config.js的配置文件，新建一个文件夹app，并在此文件夹内新建一个文件app.js作为入口文件，再在根目录下新建一个文件夹build，并创建一个文件bundle.js作为webpack打包输出文件 
	
	webpack.config.js配置如下

		var path = require('path');
		
		module.exports = {
		  entry: path.resolve(__dirname, 'app/app.js'),
		  output: {
		    path: path.resolve(__dirname, 'build'),
		    filename: 'bundle.js'
		  }
		}

	创建	`build/index.html`

		<!DOCTYPE html>
		<head>
		  <meta charset="UTF-8">
		  <title>Hacker News Front Page</title>
		</head>
		<body>
		  <script src="./bundle.js"></script>  
		</body>
		</html>

*	在项目目录下使用命令生成package.json文件（也可自己手动创建），输入此命令会出现一些信息，按提示填好即可，也可以直接按enter默认

 		npm init

* 在项目中安装webpack依赖(window下的安装命令，其他系统有所不同，)有些会有警告，忽略即可

	 	npm install webpack --save-dev
