const {
  resolveUnderRootDir
} = require('../utils')
module.exports = [
  {
    'test': /\.vue$/,
    'use': [
      {
        'loader': 'vue-loader',
        'options': {
          'loaders': {
            'sass': 'vue-style-loader!css-loader!sass-loader'
          }
        }
      }
    ]
  },
  {
    test: /\.ts(x?)$/,
    use: [{
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/],
        configFile: resolveUnderRootDir('build/commonJs/tsconfig.json')
      }
    }]
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  }
]
