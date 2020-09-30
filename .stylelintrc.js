module.exports = {
  // 继承规则集
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order'
  ],

  // 自定义规则
  rules: {
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': null,
    'selector-pseudo-element-colon-notation': null
  }
};
