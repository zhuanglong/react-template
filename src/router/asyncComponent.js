import React from 'react';

function Loading() {
  return <div>页面加载中...</div>;
}

export default function asyncComponent(importComponent) {
  return class extends React.Component {
    state = {
      component: null
    }

    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      // 因为路由动画，所以需要 div 包裹
      return <div>{C ? <C {...this.props} /> : <Loading />}</div>;
    }
  };
}
