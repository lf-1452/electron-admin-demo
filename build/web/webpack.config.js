const jsRules = require('../commonJs/jsRules');
const styleRules = require('../commonJs/styleRules');
const fileRules = require('../commonJs/fileRules');
const plugins = require('./plugins');
const rootPath = 'src/renderer/bonade-im-part/src';
const {
    mode,
    runEnv,
    resolveUnderRootDir
} = require('../utils');
const proxyObj = {
    'test': 'http://119.23.111.61:8080',
    'development': 'http://192.168.14.214:4000',
    'experience': 'https://imztty.bndxqc.com',
    'production': 'https://imzt.bndxqc.com'
};
const target = proxyObj[process.env.VUE_APP_TITLE];

// console.log(process.env.VUE_APP_TITLE, '----!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!5666!!', runEnv, target);
module.exports = {
    mode,
    'context': '',
    'entry': {
        'app': resolveUnderRootDir(`${rootPath}/main.ts`)
    },
    'output': {
        'path': process.env.NODE_ENV === 'development'
            ? resolveUnderRootDir('dist/renderer/bonade-im-part') : resolveUnderRootDir(process.env.VUE_APP_TITLE),
        'publicPath': './',
        'filename': '[name].js'
    },
    'target': 'web',
    'module': {
        'rules': [...jsRules, ...styleRules, ...fileRules]
    },
    'plugins': [...plugins],
    'resolve': {
        extensions: ['.ts', '.js', '.vue', '.json'],
        'alias': {
            '@': resolveUnderRootDir(rootPath),
            '@IM': resolveUnderRootDir(`${rootPath}/IM`),
            '@oldApi': resolveUnderRootDir(`${rootPath}/business`),
            '_imApi': resolveUnderRootDir(`${rootPath}/business/imApi`)
        }
    },
    'devtool': false,
    // node: {
    //     fs: 'empty',
    //     net: 'empty',
    //     tls: 'empty'
    // },
    'devServer': {
        'historyApiFallback': true,
        'contentBase': resolveUnderRootDir('dist/renderer/bonade-im-part/'),
        'hot': true, // 热更新
        'port': 9999, // 端口
        'compress': true, // 所有来自 dist文件 gzip 压缩和提供为服务
        'open': false, // 是否自动打开窗口
        'inline': true, // 是否重载的脚本
        'publicPath': '/', // 资源访问路径
        'proxy': {
            '/api': {
                target,
                'changeOrigin': true,
                'pathRewrite': {
                    '^/api': runEnv === 'development' ? '' : '/api'
                }
            }
        }
    }
};
