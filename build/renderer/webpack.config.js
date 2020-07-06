const jsRules = require('../commonJs/jsRules')
const styleRules = require('../commonJs/styleRules')
const fileRules = require('../commonJs/fileRules')
const plugins = require('./plugins')
const rootPath = 'src/renderer/bonade-im-part/src'
const {
  mode,
  runEnv,
  resolveUnderRootDir
} = require('../utils')
const proxyObj = {
  'test': 'http://119.23.111.61:8080',
  'development': 'http://192.168.14.214:4000',
  'experience': 'https://imztty.bndxqc.com',
  'production': 'https://imzt.bndxqc.com'
}
const target = proxyObj[process.env.VUE_APP_TITLE]

module.exports = {
  mode,
  'entry': {
    'app': resolveUnderRootDir(`${rootPath}/main.ts`)
  },
  'output': {
    'path': resolveUnderRootDir('dist/renderer/bonade-im-part'),
    'publicPath': './',
    'filename': '[name].js'
  },
  'target': 'electron-renderer',
  'module': {
    'rules': [...jsRules, ...styleRules, ...fileRules]
  },
  'plugins': [...plugins],
  'resolve': {
    'extensions': ['.vue', '.js', '.ts', 'png'],
    'alias': {
      '@': resolveUnderRootDir(rootPath),
      '@IM': resolveUnderRootDir(`${rootPath}/IM`),
      '@oldApi': resolveUnderRootDir(`${rootPath}/business`),
      '_imApi': resolveUnderRootDir(`${rootPath}/business/imApi`)
    }
  },
  'devtool': false,
  'node': {
    'fs': 'empty',
    'net': 'empty',
    'tls': 'empty'
  },
  'devServer': {
    'historyApiFallback': true,
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
}
