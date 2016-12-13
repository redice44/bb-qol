var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
  entry: {
    'contentScripts/contentFolder': './src/contentScripts/contentFolder/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/manifest.json'
      }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        DEBUG: JSON.stringify(true)
      }
    })
  ]
};

module.exports = config;
