var webpack = require('webpack')
var path = require('path');
var plugins = [];
plugins.push(
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    new webpack.optimize.UglifyJsPlugin()
)
module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, '../build'),//设置出口的相对路径为build
        publicPath: '/build/',//替换路径
        filename: 'bundle.js'
    },
    module: {
        loaders: [                                  //exclude 不打包的目录
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['react', 'es2015']}},
            {test: /\.scss$/,loader:'style-loader!css-loader!sass-loader'},
            {test: /\.(png|jpg)$/,loader: 'url-loader?limit=8192'}
        ]
    },
    //插件项
    plugins: plugins
}