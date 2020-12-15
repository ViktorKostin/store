import React from 'react';
import { Toolbar, Typography, IconButton, 
         MenuItem, Menu, Badge, AppBar, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ChatUsers } from '../containers';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    color: '#555'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MenuAppBar = (props) => {
  const {
    toogleShowLogin,
    toogleShowCart,
    toogleShowAddProductToStore,
    toogleShowSignUp,
    isLogged,
    isAdmin,
    logout,
    productsCount,
  } = props;

  const classes = useStyles();

  const [leftMenuAnchor, setLeftMenuAnchor] = React.useState(null);
  const [rightMenuAnchor, setRightMenuAnchor] = React.useState(null);
  
  const leftMenu = Boolean(leftMenuAnchor);
  const rightMenu = Boolean(rightMenuAnchor);

  const handleLeftMenu = (event) => {
    setLeftMenuAnchor(event.currentTarget);
  };
  const handleRightMenu = (event) => {
    setRightMenuAnchor(event.currentTarget);
  };

  const closeLeftMenu = () => {
    setLeftMenuAnchor(null);
  };
  const closeRightMenu = () => {
    setRightMenuAnchor(null);
  };

  return (
      <AppBar className={classes.root}>
        <Toolbar>
          {(isAdmin &&
            <>
              <IconButton onClick={handleLeftMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={leftMenuAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={leftMenu}
                onClose={closeLeftMenu}
              >
                <MenuItem onClick={() => {toogleShowAddProductToStore(); closeLeftMenu()}}>Add product</MenuItem>
              </Menu>
            </>
          )}
          <Typography variant="h6" className={classes.title}>
            Products
          </Typography>
          {(isLogged && (
            <div>
              {(isAdmin &&
                <ChatUsers />
              )}
              <IconButton aria-label="cart" onClick={toogleShowCart} >
                <Badge badgeContent={productsCount}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleRightMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={rightMenuAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={rightMenu}
                onClose={closeRightMenu}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )) || (
            <>
              <Button onClick={() => {toogleShowLogin(); closeRightMenu()}} color="inherit">Login</Button>
              <Button onClick={() => {toogleShowSignUp(); closeRightMenu()}}>Sign up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
  );
};

export default MenuAppBar;
