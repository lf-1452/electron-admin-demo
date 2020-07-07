module.exports = [
    {
        'test': /\.(js|jsx)$/,
        'loader': 'babel-loader'
    },
    {
        'test': /\.ts(x)?$/,
        'exclude': /node_modules/,
        'use': [
            'babel-loader'
        ]
    }
    // {
    //   'test': /\.(js|vue|ts|tsx|jsx)$/,
    //   'enforce': 'pre',
    //   'exclude': /node_modules/,
    //   'use': [
    //     {
    //       'loader': 'eslint-loader',
    //       'options': {
    //         'fix': false,
    //         'extensions': ['.js', '.jsx', '.vue', '.ts', '.tsx'],
    //         'cache': false,
    //         'emitWarning': true,
    //         'emitError': true
    //       }
    //     }
    //   ]
    // }
];
