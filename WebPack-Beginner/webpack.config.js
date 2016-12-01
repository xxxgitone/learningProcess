var webpack=require('webpack');

module.exports={
	devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
	entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
	output: {
	    path: __dirname + "/public",//打包后的文件存放的地方,
	    							//“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
	    filename: "bundle.js"//打包后输出文件的文件名
  	},

  	//loader功能
  	module: {//在配置文件里添加JSON loader
	    loaders: [
	      {
	        test: /\.json$/,
	        loader: "json"
	      },
	      {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        loader: 'babel'//在webpack的module部分的loaders里进行配置即可
      	  },
      	  {
	        test: /\.css$/,
	        loader: 'style!css?modules!postcss'//添加对样式表的处理，！在于使同一文件能够使用不同类型的loader
      	  }
	    ]
  	},

  	postcss: [
    	require('autoprefixer')//调用autoprefixer插件
  	],

  	//添加插件
  	plugins: [
    	new webpack.BannerPlugin("Copyright Flying Unicorns inc.")//在这个数组中new一个就可以了
  	],

  	//本地服务器
  	devServer: {
	    contentBase: "./public",//本地服务器所加载的页面所在的目录
	    colors: true,//终端中输出结果为彩色
	    historyApiFallback: true,//不跳转
	    inline: true//实时刷新
	    
  	} 
}