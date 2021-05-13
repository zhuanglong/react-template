import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import ErrorPage from '@/components/ErrorPage';

function Loading() {
  const style = {
    marginTop: hotcss.px2rem(50),
    textAlign: 'center',
    color: 'grey'
  };
  return (
    <div style={style}>
      <LoadingOutlined /> loading...
    </div>
  );
}

export default function asyncComponent(importComponent) {
  return class extends React.Component {
    state = {
      component: null,
      pastDelay: false,
      failed: false
    }

    componentDidMount() {
      this.timer = setTimeout(() => {
        this.setState({ pastDelay: true });
      }, 300);
      importComponent().then((cmp) => {
        clearTimeout(this.timer);
        this.setState({ component: cmp.default });
      }).catch(() => {
        this.setState({ failed: true });
      });
    }

    componentWillUnmount() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }

    render() {
      const { component: C, pastDelay, failed } = this.state;
      if (failed) {
        return <ErrorPage />;
      }
      return C ? <C {...this.props} /> : pastDelay && <Loading />;
    }
  };
}
