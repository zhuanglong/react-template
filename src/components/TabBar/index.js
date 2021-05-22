import React from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationAction, Badge } from '@material-ui/core/';

import './styles.scss';

const prefixCls = 'sru-TabBar';

function TabBar(props) {
  const { style, tabBarInsets, children } = props;
  return (
    <>
      {tabBarInsets && <div style={{ height: TabBar.height }} />}
      <BottomNavigation
        style={{ height: TabBar.height, ...style }}
        className={prefixCls}
      >
        {children}
      </BottomNavigation>
    </>
  );
}

function Item(props) {
  const { title, actived, icon, badge, dot, onClick } = props;
  return (
    <BottomNavigationAction
      className={`${prefixCls}-item`}
      classes={{
        root: actived && 'Mui-selected',
        label: actived && 'Mui-selected'
      }}
      icon={(
        <Badge
          max={99}
          badgeContent={badge}
          variant={dot && 'dot'}
          color="error"
        >
          {icon}
        </Badge>
      )}
      showLabel
      onClick={onClick}
      label={title}
    />
  );
}

TabBar.propTypes = {
  tabBarInsets: PropTypes.bool,
  style: PropTypes.shape([PropTypes.object]),
  children: PropTypes.arrayOf(PropTypes.element)
};

TabBar.defaultProps = {
  tabBarInsets: true,
  style: null,
  children: []
};

Item.propTypes = {
  title: PropTypes.string,
  actived: PropTypes.bool,
  icon: PropTypes.element,
  onClick: PropTypes.func
};

Item.defaultProps = {
  title: '',
  actived: false,
  icon: null,
  onClick: () => null
};

TabBar.Item = Item;
TabBar.height = hotcss.px2rem(65);

export default TabBar;
