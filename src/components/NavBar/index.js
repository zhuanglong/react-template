import React from 'react';
import { withRouter } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import { findTitleOfRoutes } from '@/router/routes';
import './styles.scss';

const prefixCls = 'sru-NavBar';

function NavBar(props) {
  return (
    <>
      <div style={{ height: NavBar.height, ...props.style }} className={prefixCls}>
        <NavBarLeftView {...props} />
        <NavBarMiddleView {...props} />
        <NavBarRightView {...props} />
      </div>
      {props.navBarInsets && <div style={{ height: NavBar.height }} /> }
    </>
  );
}

function NavBarLeftView(props) {
  const leftViewPrefixCls = `${prefixCls}-leftView`;
  const {
    showBack, leftView, leftViewStyle,
    onLeftView, onBack = () => props.history.goBack()
  } = props;
  return (
    <div style={leftViewStyle} className={leftViewPrefixCls}>
      {showBack && (
        <LeftOutlined className={`${leftViewPrefixCls}-icon`} onClick={onBack} />
      )}
      {typeof leftView === 'string'
        ? leftView && <div className={`${leftViewPrefixCls}-text`} onClick={onLeftView}>{leftView}</div>
        : leftView}
    </div>
  );
}

function NavBarMiddleView(props) {
  const middleViewPrefixCls = `${prefixCls}-middleView`;
  const { middleViewStyle } = props;
  let { title } = props;
  // 如果没有设置 title 则默认使用路由 title
  title = title === undefined ? findTitleOfRoutes(props.location.pathname) : title;
  return (
    <div style={middleViewStyle} className={middleViewPrefixCls}>
      {typeof title === 'string' ? title && <div className={`${middleViewPrefixCls}-title`}>{title}</div> : title}
    </div>
  );
}

function NavBarRightView(props) {
  const rightViewPrefixCls = `${prefixCls}-rightView`;
  const { rightView, rightViewStyle, onRightView } = props;
  return (
    <div style={rightViewStyle} className={rightViewPrefixCls}>
      {typeof rightView === 'string'
        ? rightView && <div className={`${prefixCls}-text`} onClick={onRightView}>{rightView}</div>
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
  title: undefined,
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
  text: `${prefixCls}-text`,
  title: `${prefixCls}-middleView-title`,
  icon: `${prefixCls}-icon`
};

NavBar.height = hotcss.px2rem(55);

export default withRouter(NavBar);
