module.exports = [
  {
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
        options: {
          loaders: {
            sass: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      }
    ]
  },
  {
    test: /\.ts(x?)$/,
    use:[{
            loader: 'babel-loader',
            options: {
                cacheDirectory: true
            }
        },
        {
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/\.vue$/] }
        }
    ],
    include: /src/,
    exclude: file => (
        /node_modules/.test(file) &&
        !/\.vue\.js/.test(file)
    )
},
  {
    test: /\.js$/,
    include: /src/,
    exclude: file => (
        /node_modules/.test(file) &&
        !/\.vue\.js/.test(file)
    ),
    use: [{
        loader: 'babel-loader',
        options: {
            cacheDirectory: true
        }
    }, 'eslint-loader'
    ]
},
  // {
  //   test: /\.(js|vue|ts|tsx|jsx)$/,
  //   exclude: /node_modules/,
  //   use:[ 
  //     {
  //       loader: 'babel-loader'
  //     },
  //     {
  //       loader: 'eslint-loader' ,
  //       options: {
  //         fix: false,
  //         extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
  //         cache: false,
  //         emitWarning: true,
  //         emitError: false
  //       }
  //     }
  //   ]
    // use:['babel-loader','eslint-loader']
    // use:[
    //   {
    //     loader: 'eslint-loader',
    //     enforce: 'pre',
    //     options: {
    //       fix: false,
    //       extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
    //       cache: false,
    //       emitWarning: true,
    //       emitError: false
    //     }
    //   }
    // ]
];
