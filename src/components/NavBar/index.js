import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import styles from './styles.scss';

function NavBar(props) {
  return (
    <>
      <div style={{ height: NavBar.height, ...props.style }} className={styles.container}>
        <NavBarLeftView {...props} />
        <NavBarMiddleView {...props} />
        <NavBarRightView {...props} />
      </div>
      {props.navBarInsets && <div style={{ height: NavBar.height }} /> }
    </>
  );
}

function NavBarLeftView(props) {
  const {
    showBack, leftView, leftViewStyle,
    onLeftView, onBack = () => props.history.goBack()
  } = props;
  return (
    <div style={leftViewStyle} className={styles.leftView}>
      {showBack && (
        <LeftOutlined className={styles.icon} onClick={onBack} />
      )}
      {typeof leftView === 'string'
        ? leftView && <div className={styles.text} onClick={onLeftView}>{leftView}</div>
        : leftView}
    </div>
  );
}

function NavBarMiddleView(props) {
  const { title, middleViewStyle } = props;
  return (
    <div style={middleViewStyle} className={styles.middleView}>
      {typeof title === 'string' ? title && <div className={styles.title}>{title}</div> : title}
    </div>
  );
}

function NavBarRightView(props) {
  const { rightView, rightViewStyle, onRightView } = props;
  return (
    <div style={rightViewStyle} className={styles.rightView}>
      {typeof rightView === 'string'
        ? rightView && <div className={styles.text} onClick={onRightView}>{rightView}</div>
        : rightView}
    </div>
  );
}

NavBar.propTypes = {
};

NavBar.defaultProps = {
  showBack: true,
  navBarInsets: true,
  leftView: '',
  title: '',
  rightView: '',
  style: null,
  leftViewStyle: null,
  middleViewStyle: null,
  rightViewStyle: null,
  onBack: undefined,
  onLeftView: undefined,
  onRightView: undefined
};

NavBar.styles = {
  text: styles.text,
  title: styles.title,
  icon: styles.icon
};

NavBar.height = hotcss.px2rem(55);

export default withRouter(NavBar);
