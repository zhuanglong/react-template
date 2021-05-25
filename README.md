[项目源码](https://github.com/zhuanglong/react-template/tree/styled-components)

## 使用

安装 `yarn add styled-components`。

### 简单例子

```js
import React from 'react';
import styled from 'styled-components';

class About extends React.Component {
  render() {
    return (
      <Root>
        <div className="title">
          Hello
          <span className="subTitle"> Sass</span>
        </div>
      </Root>
    );
  }
}

const Root = styled.div`
  .title {
    display: flex;
    font-size: 18px;

    .subTitle {
      color: red;
    }
  }
`;
```

### 样式类名添加前缀

[文档](https://styled-components.com/docs/tooling#babel-plugin)

安装 `yarn add -D babel-plugin-styled-components`。

.babelrc

```js
"plugins": [
    ...
    "babel-plugin-styled-components"
  ],
```

添加后对比：

![](https://gitee.com/zloooong/image_store/raw/master/img/20210525175447.png)

规则 `文件名__样式组件-sc-1pekthz-0`。

### CSS 浏览器厂商前缀

**CSS 规则会自动添加浏览器厂商前缀，我们不必考虑它。**

经测试，改变 browserslist 规则并没有对 styled-components 生效，但是规则是有的，说明是 styled-components 内置了规则。 

在生产模式下，IE11 和 Edgede 的前缀对比：

![](https://gitee.com/zloooong/image_store/raw/master/img/20210525182747.png)

为什么只有 IE 添加了前缀？这是因为 styled-components 自动识别厂商添加前缀，IE 比较老，所以添加了前缀，Edge 较新，都能兼容新特性，所以没必要加前缀。

### Stylelint

[文档](https://styled-components.com/docs/tooling#stylelint)

安装 `yarn add -D stylelint-config-styled-components stylelint-processor-styled-components`。

> 因为我的项目已经安装了其他的 stylelint 配置，所以无需再安装，详细查看项目源码。

新建 stylelint 配置文件 .stylelintrc-styled.js，内容如下：

```js
module.exports = {
  // 继承规则集
  extends: [
    'stylelint-config-standard',
    "stylelint-config-styled-components", // 用于 styled-components
    'stylelint-config-rational-order'
  ],
  // 在 stylelint 处理流中加入处理函数
  "processors": [
    "stylelint-processor-styled-components" // 用于 styled-components
  ],
  // 自定义规则
  rules: {
    'no-duplicate-selectors': null, // 禁止样式表中的重复选择器
    'declaration-empty-line-before': null, // 声明前要求或禁止空行
    'at-rule-empty-line-before': null, // 规则前要求或禁止使用空行
    'at-rule-no-unknown': null, // 禁止使用未知规则
    'selector-pseudo-class-no-unknown': null, // 禁止未知的伪类选择器
    'property-no-unknown': null // 禁止未知属性
  }
};
```

<font color="red">为什么要新建一份？</font>

> 因为项目有用到 Less、Scss，所以为了兼容，复制了一份进行修改，添加 styled-components 的支持。

在 package.json 中添加 lint 脚本：

```json
"lint:styled": "stylelint src/**/*.js --config .stylelintrc-styled.js"
```

执行 `npm run lint:styled` 检查。

<font color="red">`-- fix` 格式化，官方说不支持。</font>

> **NOTE**
>
> Beware that due to limitations on what is possible for Stylelint custom processors we cannot support the --fix option

## 总结

styled-components 是 CSS-in-JS 的最佳实现。虽然很早留意过这个库，但是一直没有尝试，今日一试发现还挺香的，而且支持 React Native。
