module.exports = [
  {
    'test': /\.(png|jpg|gif|ico)$/i,
    'use': [{
      'loader': 'url-loader',
      'options': {
        'limit': 100 * 1024
      }
    }]
  },
  {
    'test': /\.(woff|svg|eot|ttf)\??.*$/, // 匹配图标类文件
    // exclude: /node_modules/,
    'loader': 'url-loader?limit=102400&name=[path][name].[ext]' // [xx]是占位符写法  [path]代表服务器根目录 [name]代表转译前的文件名 [ext]代表转译前的文件类型名 如jpg/woff/svg等
  }
];
