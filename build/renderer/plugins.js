const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {
  resolveUnderRootDir
} = require('../utils');
const {
  VueLoaderPlugin
} = require('vue-loader');
const plugins = [
  process.env.NODE_ENV === 'development' ?

    new HtmlWebpackPlugin({
      'template': resolveUnderRootDir('src/renderer/bonade-im-part/index.html')
    }) :
    new HtmlWebpackPlugin({
      'filename': resolveUnderRootDir('dist/renderer/bonade-im-part/index.html'),
      'template': resolveUnderRootDir('src/renderer/bonade-im-part/index.html')
    }),
  new VueLoaderPlugin(), // 用来解析.vue文件的
  new webpack.DefinePlugin({
    'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
    'process.env.VUE_APP_TITLE': JSON.stringify(process.env.VUE_APP_TITLE)
  })
];

module.exports = [...plugins];
