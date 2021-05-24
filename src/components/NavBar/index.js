import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  AppBar, Toolbar,
  Typography,
  IconButton,
  Button
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { findTitleOfRoutes } from '@/router/routes';
import './styles.scss';

const prefixCls = 'sru-NavBar';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

function NavBar(props) {
  return (
    <>
      <AppBar
        position="fixed"
        className={prefixCls}
        style={{ height: NavBar.height, ...props.style }}
      >
        <Toolbar>
          <NavBarLeftView {...props} />
          <NavBarMiddleView {...props} />
          <NavBarRightView {...props} />
        </Toolbar>
      </AppBar>
      {props.navBarInsets && <div style={{ height: NavBar.height }} /> }
    </>
  );
}

function NavBarLeftView(props) {
  const {
    showBack, onBack = () => props.history.goBack()
  } = props;
  const classes = useStyles();
  return showBack && (
    <IconButton
      edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
      onClick={onBack}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}

function NavBarMiddleView(props) {
  let { title } = props;
  // 如果没有设置 title 则默认使用路由 title
  title = title === undefined ? findTitleOfRoutes(props.location.pathname) : title;
  return (
    <Typography variant="h6" className={`${prefixCls}-title`}>
      {title}
    </Typography>
  );
}

function NavBarRightView(props) {
  const { rightView, onRightView } = props;
  return typeof rightView === 'string'
    ? rightView && <Button color="inherit" onClick={onRightView}>{rightView}</Button>
    : rightView;
}

NavBar.propTypes = {
};

NavBar.defaultProps = {
  showBack: true,
  navBarInsets: true,
  title: undefined,
  rightView: '',
  style: null,
  onBack: undefined,
  onRightView: undefined
};

NavBar.height = hotcss.px2rem(55);

export default withRouter(NavBar);
