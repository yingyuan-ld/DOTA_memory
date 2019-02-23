// const webpack = require('webpack')
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');//用于自动生成html入口文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//将CSS代码提取为独立文件的插件
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");//CSS模块资源优化插件
module.exports = {
    mode:'development',
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
                     loader: 'style-loader'//建议生产环境采用此方式解耦CSS文件与js文件
                  },{
                    loader: 'css-loader',//CSS加载器 
                  },{
                    loader: 'sass-loader'//SCSS加载器，webpack默认使用node-sass进行编译
                  }
                ]
            },
            {test: /\.(png|jpg)$/,loader: 'url-loader?limit=8192'}
        ]
        // loaders: [                               //exclude 不打包的目录         
        //     {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['react', 'es2015']}},
        //     // {test: /\.scss$/,loader:'style-loader!css-loader'},
        //     {test: /\.scss$/,loader:'style-loader!css-loader!sass-loader'},
        //     　　　 {test: /\.(png|jpg)$/,loader: 'url-loader?limit=8192'}
        // ]
    }
}