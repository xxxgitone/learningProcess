#WebPack入门(配置React开发环境)
###1.什么是webpack？
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。

注意：在windows下执行很多命令都会出现警告，只要不是错误一般都可以忽略掉
###2.安装和使用(前提已经安装的Node.js)
* webpack安装
	* 全局安装webpack

			npm install webpack -g

	* 全局安装服务器webpack-dev-server

			npm install webpack-dev-server -g
* webpack配置文件

	在项目根目录下创建一个名为`webpack.config.js`的配置文件，新建一个文件夹`app`，并在此文件夹内新建一个文件`app.js`作为入口文件，再在根目录下新建一个文件夹build，并创建一个文件`bundle.js`作为webpack打包输出文件 
	
	`webpack.config.js`配置如下

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

	运行 `webpack` 打包，运行 `webpack-devserver` 启动服务器[http://localhost:8080/build/index.html](http://localhost:8080/build/index.html "http://localhost:8080/build/index.html, ")访问，关掉服务器可以按住 `ctrl+c`；每次修改代码后都要重新使用上面两个命令，不过也可以安装插件，实现修改后即可看到

*	配置 `package.json`
	*	在项目目录下使用命令生成`package.json`文件（也可自己手动创建），输入此命令会出现一些信息，按提示填好即可，也可以直接按`enter`默认

 			npm init

	修改`package.json`中的`script`项
	
		"scripts": {
		  "start": "webpack-dev-server",
		  "build": "webpack"
		}

	这里配置作用是：执行`npm run build` 可以代替执行`webpack`，`npm start` 代替`webpack-dev-server`

*	安装依赖

	*	在项目中安装`webpack`，`webpack-dev-server`依赖，[为什么要再安装依赖？](http://www.cnblogs.com/PeunZhang/p/5629329.html "为什么要再安装依赖？")
	
			npm install webpack --save-dev
			npm install webpack-dev-server --save-dev

	* 安装`React`

			npm install react react-dom --save

	* 如果有需要可以安装jquery

			npm install jquery --save

	* 安装Babel的loader以支持ES6语法

	 		npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev

	*	配置`webpack.config.js`

			// webpack.config.js
			
			var path = require('path');
			
			module.exports = {
			  entry: path.resolve(__dirname, 'app/app.js'),
			  output: {
			    path: path.resolve(__dirname, 'build'),
			    filename: 'bundle.js'
			  },
			  module: {
			    loaders: [
			    {
			      test: /\.jsx?$/,
			      exclude: /node_modules/,
			      loader: 'babel',
			      query: {
			        presets: ['es2015','react']
			      }
			    },
			    ]
			  }
			};

	*	进行测试一下看是否搭建好

			// app.js
			
			import $ from 'jquery';
			import React from 'react';
			import { render } from 'react-dom';
			
			class HelloWorld extends React.Component {
			  render() {
			    return (
			        <div>Hello World</div>
			        );
			  }
			}
			
			render(<HelloWorld />, $('#content')[0]);

	* 在index.html

			<body>
			  <div id="content"></div>
			  <script src="./bundle.js"></script>  
			</body>

	执行`npm run build` 和`npm start` 打开[http://localhost:8080/build/index.html]( http://localhost:8080/build/index.html " http://localhost:8080/build/index.html")可以看到helloworld即表示成功

*	安装其他模块

	*	图片loader

			npm install url-loader file-loader --save-dev
	* 图片loader配置

			//...
			
			 loaders: [
			 {
			   test: /\.jsx?$/,
			   exclude: /node_modules/,
			   loader: 'babel',
			   query: {
			     presets: ['es2015','react']
			   }
			 },
			 {
			   test: /\.(png|jpg|gif)$/,
			   loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
			 }
			 ]
			
			//...
	*	引用

			import imageLogo from './y18.gif';

	*	css模块

			npm install css-loader style-loader --save-dev
	* 配置

			{
			 test: /\.css$/,
			 loader: 'style!css'
			}

	*	引用

			import './yourfilename.css';
	* json模块

		npm install --save-dev json-loader
	* 配置

			  {
		        test: /\.json$/,
		        loader: "json"
			  }

	* 引用

			import config from './config.json';

扩展阅读

[给新手的 React&Webpack 上手教程](https://github.com/theJian/build-a-hn-front-page "https://github.com/theJian/build-a-hn-front-page")

[入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f# "入门Webpack，看这篇就够了")
