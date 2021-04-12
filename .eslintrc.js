module.exports = {
  // 规则运行的环境
  env: {
    browser: true,
    node: true,
    es6: true
  },

  // 继承规则集
  extends: [
    'airbnb',
    'airbnb/hooks'
  ],

  // JS 语言选项
  parserOptions: {
    ecmaFeatures: {
      jsx: true // 支持 JSX 语法
    }
  },

  // 解决警告"Parsing error: Unexpected character '@'"
  parser: 'babel-eslint',

  // 忽略检查的全局变量
  globals: {
    hotcss: true
  },

  // 自定义规则
  rules: {
    'dot-notation': 0,
    'comma-dangle': ['error', 'never'], // 不允许尾随逗号
    'linebreak-style': 0,
    'max-len': 0, // 行最大长度
    'global-require': 0, // require() 可以在代码中的任何地方调用

    'react/destructuring-assignment': 0, // 使用析构状态赋值
    'react/prefer-stateless-function': 0, // 组件应该写成纯函数
    'react/jsx-props-no-spreading': 0, // 不用给组件传递 {...this.props}
    'react/state-in-constructor': 0, // state 初始化应该在构造函数中
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }], // 允许扩展名为".js"的使用"JSX"
    // 'react/jsx-wrap-multilines': 0, // 将多行 JSX 包装在括号中可以提高可读性
    'react/prop-types': 0, // 防止在 React 组件定义中丢失 props 验证
    // 'react/forbid-prop-types': [2, { forbid: ['any'] }], // 禁止某些 propTypes
    'react/jsx-one-expression-per-line': 0, // 将 JSX 中的每一行限制为一个表达式

    'import/no-extraneous-dependencies': [2, { optionalDependencies: true }], // 检查项目 import 的依赖是否符合 devDependencies 或 dependencies
    'import/no-unresolved': [2, { ignore: ['^@/'] }] // 路径别名
  }
};
