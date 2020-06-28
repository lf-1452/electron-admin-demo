const {
    resolveUnderRootDir
} = require('../utils')

module.exports = [{
        // 配置scss文件
        test: /\.scss$/,
        include: [resolveUnderRootDir('src/renderer/bonade-im-part')],
        use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            {
                loader: 'style-resources-loader',
                options: {
                  patterns: [resolveUnderRootDir('src/renderer/bonade-im-part/src/styles/style.scss')]
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