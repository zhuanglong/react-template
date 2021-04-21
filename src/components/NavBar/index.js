import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import styles from './styles.scss';

function NavBar(props) {
  return (
    <>
      <div style={{ ...props.style, height: NavBar.height }} className={styles.container}>
        <NavBarLeftView {...props} />
        <NavBarMiddleView {...props} />
        <NavBarRightView {...props} />
      </div>
      <NavBarFillView />
    </>
  );
}

function NavBarLeftView(props) {
  const { showBack, onBack = () => props.history.goBack(), leftView, leftViewStyle } = props;
  return (
    <div style={leftViewStyle} className={styles.leftView}>
      {showBack && (
        <LeftOutlined className={styles.icon} onClick={onBack} />
      )}
      {typeof leftView === 'string' ? <div className={styles.text}>{leftView}</div> : leftView}
    </div>
  );
}

function NavBarMiddleView(props) {
  const { title, middleViewStyle } = props;
  return (
    <div style={middleViewStyle} className={styles.middleView}>
      {typeof title === 'string' ? <div className={styles.title}>{title}</div> : title}
    </div>
  );
}

function NavBarRightView(props) {
  const { rightView, rightViewStyle } = props;
  return (
    <div style={rightViewStyle} className={styles.rightView}>
      {typeof rightView === 'string' ? <div className={styles.text}>{rightView}</div> : rightView}
    </div>
  );
}

function NavBarFillView() {
  return (
    <div style={{ height: NavBar.height }} />
  );
}

NavBar.propTypes = {
};

NavBar.defaultProps = {
  showBack: true,
  onBack: null,
  leftView: '',
  title: '',
  rightView: '',
  style: null,
  leftViewStyle: null,
  middleViewStyle: null,
  rightViewStyle: null
};

NavBar.styles = {
  text: styles.text,
  title: styles.title,
  icon: styles.icon
};

NavBar.height = hotcss.px2rem(55);

export default withRouter(NavBar);
