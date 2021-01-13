import React from 'react';
import styles from './styles.scss';

class About extends React.Component {
  constructor(props) {
    super(props);
    props.cacheLifecycles.didCache(this.componentDidCache);
    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }

  componentDidCache = () => {
    console.log('缓存组件');
  }

  componentDidRecover = () => {
    console.log('恢复组件');
  }

  gotoCounterState = () => {
    this.props.history.push('/counterState');
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.gotoCounterState}>goto CounterState</button>
        <div className={styles.title}>
          测试
          <span className={styles.subTitle}> 滚动条缓存</span>
        </div>
        <div style={{ height: '200px', overflowY: 'scroll' }}>
          <p style={{ height: '200px' }}>1hhhhhhhhhhhhhhhh</p>
          <p style={{ height: '200px' }}>2hhhhhhhhhhhhhhhh</p>
          <p style={{ height: '200px' }}>3hhhhhhhhhhhhhhhh</p>
        </div>
      </div>
    );
  }
}

export default About;
