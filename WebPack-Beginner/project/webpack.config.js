const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 这是 packet.json 中 dependencies 下的
const VENOR = [
  "faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "react-router",
  "redux",
  "redux-form",
  "redux-thunk"
]

module.exports = {
	entry: {
    bundle: './src/index.js',
    vendor: VENOR
  },
	output: {
		// 必须使用绝对路径，输出文件夹
    path: path.resolve(__dirname, 'dist'),
    // 既然我们希望缓存生效，就应该每次在更改代码以后修改文件名
    // [chunkhash]会自动根据文件是否更改而更换哈希
    filename: '[name].[chunkhash].js', // 打包后输出的文件的名字,
    publicPath: '/dist/'
  },
  devServer: {
    port: 8081
  },
  devtool: '#cheap-module-eval-source-map',
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
    // 提取公用代码，比如上面vendor中的
    new webpack.optimize.CommonsChunkPlugin({
       // vendor 的意义和之前相同
      // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
      names: ['vendor', 'manifest'],
      // // 配合 manifest 文件使用
      minChunks: Infinity
    }),
		// 输出文件路径
    new ExtractTextPlugin('css/[name].[hash].css'),
    // 每次打包前删除之前存在的
    // 只删除 dist 文件夹下的 bundle 和 manifest 文件
    new CleanWebpackPlugin(['dist/bundle.*.js', 'dist/manifest.*.js'], {
      // 打印 log
      verbose: true,
      // 删除文件
      dry: false
    }),
    // 我们这里将之前的 HTML 文件当做模板, js文件会自动插入这个html文件中
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // 生成全局变量
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("process.env.NODE_ENV")
    }),
    // 压缩提取出的 CSS，并解决ExtractTextPlugin分离出的 JS 重复问题
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
	]
}
