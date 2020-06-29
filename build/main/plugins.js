const webpack = require('webpack');
const ElectronDevWebpackPlugin = require('electron-dev-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const {
  mode
} = require('../utils');

let plugin = [
  new webpack.NoEmitOnErrorsPlugin(),
  new ElectronDevWebpackPlugin(),
  new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: ['Your application main process is running here']
    }
  }),
  new webpack.DefinePlugin({
    'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
    'process.env.VUE_APP_TITLE': JSON.stringify(process.env.VUE_APP_TITLE)
  })
];


if (mode !== 'development') {
  plugin.splice(1, 1);
}

module.exports = plugin;
