module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "node": true,
  },
  "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:vue/essential",
  ],
  "globals": {},
  "parserOptions": {
      "ecmaVersion": 2018,
      "parser": "@typescript-eslint/parser",
      "sourceType": "module"
  },
  "plugins": [
      "vue",
      "@typescript-eslint"
  ],
  "rules": {
      "no-alert": 2,
      "no-cond-assign": 2, //禁止在条件表达式中使用赋值语句
      "no-const-assign": 2, //禁止修改const声明的变量
      "no-constant-condition": 2, //禁止在条件中使用常量表达式 if(true) if(1)
      "no-continue": 2, //禁止使用continue
      "no-dupe-keys": 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
      "no-dupe-args": 2, //函数参数不能重复
      "no-duplicate-case": 2, //switch中的case标签不能重复
      "no-else-return": 2, //如果if语句里面有return,后面不能跟else语句
      "no-empty": 2, //块语句中的内容不能为空
      "no-func-assign": 2, //禁止重复的函数声明
      "no-implicit-coercion": 2, //禁止隐式转换
      "no-new-func": 2, //禁止使用new Function
      "no-new-object": 2, //禁止使用new Object()
      "no-process-env": 0, //禁止使用process.env
      "no-redeclare": 2, //禁止重复声明变量
      "no-spaced-func": 2, //函数调用时 函数名与()之间不能有空格
      "no-unneeded-ternary": 2, //禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
      "no-unreachable": 2, //不能有无法执行的代码
      "no-unused-expressions": 2, //禁止无用的表达式
      "no-unused-vars": 2, //不能有声明后未被使用的变量或参数
      "no-use-before-define": 2, //未定义前不能使用
      "no-var": 2, //禁用var，用let和const代替
      "camelcase": 2, //强制驼峰法命名
      "complexity": [0, 11], //循环复杂度
      "consistent-this": [2, "that"], //this别名
      "default-case": 2, //switch语句最后必须有default
      "eqeqeq": 2, //必须使用全等
      "indent": [2,4], //缩进风格
      "max-params": [0, 3], //函数最多只能有3个参数
      "max-statements": [0, 10], //函数内最多有几个声明
      "semi": [2, "always"],//语句强制分号结尾
      "strict": 2,//使用严格模式
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/explicit-function-return-type":0
  }
};
