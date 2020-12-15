import { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Login = ({showLogin, toogleShowLogin, login}) => {
  let iref = useRef();

  const onSubmit = e => {
    e.preventDefault();
    
    const email = iref.querySelector('[name="email"]').value;
    const password = iref.querySelector('[name="password"]').value;
    login(email, password);
  };

  const handleClose = () => {
    toogleShowLogin();
  };

  return (
    <div>
      <Dialog open={showLogin} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={onSubmit}>
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent ref={node => iref = node}>
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="email"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              name="password"
              type="password"
              label="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type='submit' color="primary">
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Login;
