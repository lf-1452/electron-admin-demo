const path = require('path');
const jsRules = require('./jsRules');
const {
  mode,
  resolveUnderRootDir
} = require('../utils');
const plugins = require('./plugins');
const entry = resolveUnderRootDir('src/main');
module.exports = {
  mode,
  entry: {
    main: entry
  },
  output: {
    path: resolveUnderRootDir('dist/main'), // 出口文件
    filename: '[name].js'
  },
  externals: {
    'electron-shortcut-capture': 'require("electron-shortcut-capture")'
  },
  target: 'electron-main', // 主线程
  module: {
    rules: [...jsRules]
  },
  watch: mode === 'development' ? true : false,
  devtool: false,
  plugins: [...plugins],
  resolve: {
    extensions: ['.ts', '.js', '.json', '.png']
  },
  node: {
    __dirname: false, // 常规的 Node.js __dirname 行为。在 Node.js 环境中运行时，输出文件的目录名。
    __filename: false, //常规的 Node.js __filename 行为。在 Node.js 环境中运行时，输出文件的文件名
  }
};
