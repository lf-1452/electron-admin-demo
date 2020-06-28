const {
  resolveUnderRootDir
} = require('../utils')
module.exports = [{
        test: /\.(png|jpg|gif|ico)$/i,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8192
            }
        }]
    },
  {
    test: /\.svg$/,
    include: [resolveUnderRootDir('src/renderer/bonade-im-part/src/quill/assets/icons')],  //配置svg
    use: [
      {
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
    ],
  },
    {
        test: /\.(woff|svg|eot|ttf)\??.*$/, // 匹配图标类文件
        exclude:[resolveUnderRootDir('src/renderer/bonade-im-part/src/quill/assets/icons')],
        loader: 'url-loader?limit=50000&name=[path][name].[ext]' // [xx]是占位符写法  [path]代表服务器根目录 [name]代表转译前的文件名 [ext]代表转译前的文件类型名 如jpg/woff/svg等
    },
]
