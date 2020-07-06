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
    test: /\.js$/,
    loader: 'babel-loader'
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      "babel-loader",
      {
        loader: "ts-loader",
        options: { appendTsxSuffixTo: [/\.vue$/] }
      }
    ]
  },
  // {
  //   'test': /\.ts(x)?$/,
  //   'exclude': /node_modules/,
  //   'use': [
  //     'babel-loader'
  //   ]
  // },
  {
    'test': /\.(js|vue|ts|tsx|jsx)$/,
    'enforce': 'pre',
    'exclude': /node_modules/,
    'use': [
      {
        'loader': 'eslint-loader',
        'options': {
          'fix': false,
          'extensions': ['.js', '.jsx', '.vue', '.ts', '.tsx'],
          'cache': false,
          'emitWarning': true,
          'emitError': true
        }
      }
    ]
  }
];
