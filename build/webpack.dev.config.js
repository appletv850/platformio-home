'use strict';

/**
 * Copyright (c) 2017-present PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.join(common.appDir, 'index.jsx'),
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: common.outputDir,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: common.loaders.concat({
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
      exclude: ['node_modules']
    })
  },
  devServer: {
    contentBase: './dist',
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    disableHostCheck: true,
    port: 9000,
    host: 'localhost'
  },
  plugins: [
    ...common.plugins,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(common.appDir, 'index.html'),
      inject: 'body',
      favicon: path.join(common.mediaDir, 'images', 'favicon.ico')
    })
  ]
};