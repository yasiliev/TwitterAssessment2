'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devtool = 'source-map'

const devServer = {
  historyApiFallback: true
}

const entry = {
  main: [
    'babel-polyfill',
    './src/main'
  ],
  vendors: [
    'angular',
    'angular-animate',
    'angular-aria',
    'angular-material',
    'angular-messages',
    'angular-ui-router',
    'angular-material/angular-material.css',
    'angular-cookies',
  ]
}

const output = {
  filename: '[name].js',
  path: './dist',
  publicPath: '/'
}

const extensions = [
  '',
  '.js',
  '.css',
  '.html'
]

const modulesDirectories = [
  'node_modules',
  'lib'
]

const loaders = [{
  test: /.js$/,
  exclude: /node_modules/,
  loaders: ['ng-annotate', 'babel']
}, {
  test: /.css$/,
  loader: ExtractTextPlugin.extract('style', 'css')
}, {
  test: /.html$/,
  exlude: /node_modules/,
  include: /static/,
  loader: 'html'
}, {
  test: /.html$/,
  exclude: /node_modules/,
  include: /src/,
  loaders: [
    'ngtemplate?requireAngular',
    'html'
  ]
}, {
  test: /.(ico|png|eot|svg|ttf|woff|woff2)$/,
  loader: 'url?limit=10000'
}]

const plugins = [
  new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin({
    hash: true,
    inject: 'head',
    template: 'static/index.html'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  })
]

module.exports = {
  devtool,
  devServer,
  entry,
  output,
  resolve: {
    extensions,
    modulesDirectories
  },
  module: {
    loaders
  },
  plugins
}
