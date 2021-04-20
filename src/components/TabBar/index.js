import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

function TabBar(props) {
  return (
    <div className={classnames(styles.tabBar, props.className)}>
      {props.children}
    </div>
  );
}

function Item(props) {
  const {
    title, selected, icon, onPress
  } = props;
  return (
    <div
      className={classnames(styles.tabBarItem, selected && styles.active)}
      onClick={onPress}
    >
      {icon}
      {title}
    </div>
  );
}

TabBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};

TabBar.defaultProps = {
  className: '',
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

export default TabBar;
