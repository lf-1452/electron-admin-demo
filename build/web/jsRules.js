const {
    resolveUnderRootDir
} = require('../utils');
module.exports = [{
		test: /\.vue$/,
		use: [{
			loader: 'vue-loader',
			options: {
				loaders: {
					'sass': 'vue-style-loader!css-loader!sass-loader'
				}
			}
		}]
	},
	{
		test: /\.ts(x?)$/,
		use: [{
			loader: 'ts-loader',
			options: {
				transpileOnly: true,
				configFile: resolveUnderRootDir('build/renderer/tsconfig.json')
			}
		}]
	},
	// {
	// 	test: /\.ts(x?)$/,
	// 	use: [{
	// 		loader: 'tslint-loader',
	// 		options: {
	// 			configFile: path.resolve(__dirname, './tslint.json'),
	// 		},
			
	// 	}],
	// 	exclude: /node_modules/,
	// },
	{
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader'
		},
	}
]