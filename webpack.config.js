var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
  entry: {
    'contentScripts/contentFolder': './src/contentScripts/contentFolder.js',
    'contentScripts/dateManagement': './src/contentScripts/dateManagement.js'
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
      },
      {
        context: './src/styles',
        from: './*.css',
        to: './contentScripts/'
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
