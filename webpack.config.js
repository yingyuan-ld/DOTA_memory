const HtmlWebpackPlugin = require('html-webpack-plugin');//用于自动生成html入口文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//将CSS代码提取为独立文件的插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");//CSS模块资源优化插件
const resolve = dir => require('path').join(__dirname, dir)

module.exports = (env, argv) => {
	const isProductEnv = argv.mode === 'production';// 判断环境

	const plugins = [];
	plugins.push(//生成入口html文件
		new HtmlWebpackPlugin({
			template: './src/pages/index.html',
		})
	)
	plugins.push(
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash:8].css"
		})//为抽取出的独立的CSS文件设置配置参数
	)

	return {
		mode: isProductEnv?'production':'development',
		entry: [
			'./src/pages/index.js'
		],
		resolve: {
			alias: {
				'@': resolve('src'), //配置src目录的别名
			}
		},
		output: {
			path:__dirname + '/build',//设置出口的相对路径为build
			publicPath: '/build/',//替换路径 “放到web服务器下的目录”
			filename:'bundle.[contenthash:8].js'
		},
		module: {
			rules: [{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/env', '@babel/react']
						}//这个是babel的属性
					}]
				},{
					test: /\.scss$/,
					exclude: /node_modules/, //排除node_modules文件夹
					use: [{
							loader: MiniCssExtractPlugin.loader//建议生产环境采用此方式解耦CSS文件与js文件
						},{
							loader: 'css-loader',//CSS加载器
							// options: {modules:true} //CSS代码中的样式名替换为哈希值
						},{
							loader: 'sass-loader',//SCSS加载器，使用 dart sass 编译
						options: {
							api: 'modern'
						}
						}
					]
				},{
					test:/\.(jpg|png|svg|gif)$/i,
					type: 'asset',//小于 maxSize 内联，否则输出文件
					parser: {
						dataUrlCondition: {
							maxSize: 1024
						}
					},
					generator: {
						filename: 'imgs/[hash][ext]'
					}
				}
			]
		},
		plugins,
		optimization:{
			//对生成的CSS文件进行代码压缩 mode='production'时生效
			// '...' 保留 webpack 5 默认的 JS 压缩
			minimizer:[
				'...',
				new CssMinimizerPlugin()
			]
		}
	}
}
