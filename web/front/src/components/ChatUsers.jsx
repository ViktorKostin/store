import { useState } from 'react';
import { IconButton, MenuItem, Menu, Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  badge: {
    marginLeft: 25,
  },
}));

const ChatUsers = ({ countUsers, users, setReciever, setReaded }) => {
  const classes = useStyles();
  const [anchorMessages, setAnchorMessages] = useState(null);
  const openMessages = Boolean(anchorMessages);
  const handleMessages = (event) => {
    setAnchorMessages(event.currentTarget);
  };
  const closeMessages = () => {
    setAnchorMessages(null);
  };

  return (
    <>
      <IconButton onClick={handleMessages}>
        <Badge badgeContent={countUsers} color='primary'>
          <MailIcon />
        </Badge>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMessages}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            maxHeight: 200
          }
        }}
        open={openMessages}
        onClose={closeMessages}
      >
        {Object.keys(users).map((user) => (
          <MenuItem key={user} onClick={() => {closeMessages(); setReciever(user); setReaded(user)}}>
            <ListItemText primary={users[user].name} />
              <Badge className={classes.badge} variant={users[user].readed ? 'standard' : 'dot'} color='primary' />
            <ListItemIcon>
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ChatUsers;
