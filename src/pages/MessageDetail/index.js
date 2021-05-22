import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import NavBar from '@/components/NavBar';
import { getURLSearchParams } from '@/utils/tools';

function MenuView() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>选项1</MenuItem>
        <MenuItem onClick={handleClose}>选项2</MenuItem>
      </Menu>
    </>
  );
}

function MessageDetail(props) {
  const { id } = getURLSearchParams(props.location.search);
  document.title = id;
  return (
    <>
      <NavBar
        title={id}
        rightView={<MenuView />}
        style={{
          backgroundColor: '#666'
        }}
      />
      Message ID: {id}
    </>
  );
}

export default MessageDetail;
