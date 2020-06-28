  const {
      resolveUnderRootDir
  } = require('../utils')

  module.exports = [{
          // 配置less文件
          test: /\.less$/,
          include: [resolveUnderRootDir('src/renderer/bonade-im-part')],
          //   loader: "style-loader!css-loader!less-loader",
          use: [
              'style-loader',
              'css-loader',
              'less-loader',
              {
                  loader: 'style-resources-loader',
                  options: {
                      patterns: [resolveUnderRootDir('src/renderer/bonade-im-part/src/assets/css/style.less')]
                  }
              }
          ]
      },
      {
          test: /\.css$/, // 用正则匹配文件名， 这里的意思是以.css结尾的文件用如下插件进行转译
          exclude: '/node_modules/',
          loader: 'style-loader!css-loader?sourceMap'
      }
  ]
