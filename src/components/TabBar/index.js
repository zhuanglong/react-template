import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

function TabBar(props) {
  const { style, tabBarInsets, children } = props;
  return (
    <>
      {tabBarInsets && <div style={{ height: TabBar.height }} />}
      <div
        className={styles.tabBar}
        style={{ height: TabBar.height, ...style }}
      >
        {children}
      </div>
    </>
  );
}

function Item(props) {
  const { title, selected, icon, onPress } = props;
  return (
    <div
      className={classnames(styles.tabBarItem, selected && styles.tabBarItemActive)}
      onClick={onPress}
    >
      <div style={{ position: 'relative' }}>
        {icon && <div className={styles.icon}>{icon}</div>}
        {icon && title && <div className={styles.spacer} />}
        {title && <div className={styles.title}>{title}</div>}
        <Badge {...props} />
      </div>
    </div>
  );
}

function Badge(props) {
  const { badge, dot } = props;
  let elem = null;
  if (dot) {
    elem = <div className={styles.badgeDot} />;
  } else {
    elem = <div className={styles.badge}>{badge}</div>;
  }
  return elem;
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
  selected: PropTypes.bool,
  icon: PropTypes.element,
  onPress: PropTypes.func
};

Item.defaultProps = {
  title: '',
  selected: false,
  icon: null,
  onPress: () => null
};

TabBar.Item = Item;
TabBar.height = hotcss.px2rem(75);

export default TabBar;
