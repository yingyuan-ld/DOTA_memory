var webpack = require('webpack')
var path = require('path');
module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['react', 'es2015']}},
      {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  }
}