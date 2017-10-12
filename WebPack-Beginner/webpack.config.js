const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: './app/index.js',
	output: {
		// 必须使用绝对路径，输出文件夹
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js', // 打包后输出的文件的名字,
		publicPath: '/dist/' // 资源文件目录
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// 限制图片大小为10000B，小于限制会将图片转换成base64格式
							limit: 10000,
							// 超出限制，创建的文件格式
              // dist/images/[图片名].[hash].[图片格式]
							name: 'images/[name].[hash].[ext]'
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							module: true
						}
					}]
				})
			}
		]
	},

	// 插件列表
	plugins: [
		// 输出文件路径
		new ExtractTextPlugin('css/[name].[hash].css')
	]
}
