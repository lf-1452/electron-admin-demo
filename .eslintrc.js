module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'node': true,
        'es6': true,
        'jest': true,
    },
    'extends': ['eslint:recommended'],
    'plugins': ['vue'],
    'parser': 'babel-eslint',   // 必须指定解析器，否则错误难消
    'parserOptions': {
        'parser': '@typescript-eslint/parser',
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 8,
        'sourceType': 'module',
        'useJSXTextNode': true,
        'project': './tsconfig.json',
        'tsconfigRootDir': './',
        'extraFileExtensions': ['.vue']
    },
    'rules': {
        'no-console':0,
        'indent': ['error', 4],
        'linebreak-style': ['off', 'windows'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-unused-vars': [1, {'vars': 'all', 'args': 'after-used'}]
    },
    globals: {
        'layer': true
    }
};
