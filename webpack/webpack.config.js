var webpack = require('webpack')
var path = require('path');
module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, '../build'),//设置出口的相对路径为build
        publicPath: '/build/',//替换路径(因为输出目录和开发目录的结构的变化，如果不设置publicPath,就会造成图片路径找不到)
        filename: 'bundle.js'
    },
    module: {
        loaders: [                                  //exclude 不打包的目录
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['react', 'es2015']}},
            {test: /\.scss$/,loader:'style-loader!css-loader!sass-loader'},
            {test: /\.(png|jpg)$/,loader: 'url-loader?limit=8192'}
        ]
    }
}