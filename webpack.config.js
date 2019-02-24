// const HtmlWebpackPlugin = require('html-webpack-plugin');//用于自动生成html入口文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//将CSS代码提取为独立文件的插件
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");//CSS模块资源优化插件
module.exports = {
    // mode:'development',
    mode:'production',
    entry: [
        './index.js'
    ],
    output: {
        // path: path.resolve(__dirname, 'build'),
        path:__dirname + '/build',//设置出口的相对路径为build
        publicPath: '/build/',//替换路径 “放到web服务器下的目录”
        filename:'bundle.js'
    },
    module: {
        rules: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['react', 'es2015']}},
            {
                test: /\.scss$/,
                exclude: /node_modules/, //排除node_modules文件夹
                use: [{
                        loader: MiniCssExtractPlugin.loader//建议生产环境采用此方式解耦CSS文件与js文件
                    },{
                        loader: 'css-loader',//CSS加载器 
                        // options: {modules:true} //CSS代码中的样式名替换为哈希值
                    },{
                        loader: 'sass-loader'//SCSS加载器，webpack默认使用node-sass进行编译
                    }
                ]
            },{
                test:/\.(jpg|png|svg|gif)/,
                use:[{
                loader:'url-loader',
                    options:{
                    // limit:8129,//小于limit限制的图片将转为base64嵌入引用位置
                    // fallback:'file-loader',//大于limit限制的将转交给指定的loader处理
                    outputPath:'imgs/'
                    }
                }]
            }
            // {test: /\.(png|jpg)$/,loader: 'url-loader?limit=8192'}
        ]
    },
    plugins:[
        // new HtmlWebpackPlugin(),//生成入口html文件
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })//为抽取出的独立的CSS文件设置配置参数
    ],
    optimization:{
        //对生成的CSS文件进行代码压缩 mode='production'时生效
        minimizer:[
            new OptimizeCssAssetsPlugin()
        ]
    }
}