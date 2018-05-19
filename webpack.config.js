var webpack = require('webpack')
var path = require('path');
module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),//设置出口的相对路径为build
    filename: 'bundle.js'
  },
  module: {
    loaders: [                               //exclude 不打包的目录         
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['react', 'es2015']}},
      {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  }
}