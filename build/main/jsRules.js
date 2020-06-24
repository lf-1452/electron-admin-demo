const {
    resolveUnderRootDir
} = require('../utils');

module.exports = [{
        test: /\.js$/,
        loader: 'babel-loader'
    },
    {
        test: /\.ts(x?)$/,
        use: [{
            loader: 'ts-loader',
            options: {
                configFile: resolveUnderRootDir('build/main/tsconfig.json')
            }
        }]
    }
]