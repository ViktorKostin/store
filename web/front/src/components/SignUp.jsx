import { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog,
         DialogContent, DialogTitle,
         FormControlLabel, Checkbox,
         FormControl, FormLabel,
         DialogActions,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
  },
}));

const SignUp = (props) => {
  const {
    showSignUp,
    toogleShowSignUp,
    signUp,
    rolesFromServer,
    fetchRoles,
    pending,
  } = props;

  const classes = useStyles();

  let iref = useRef();
  const [roles, setRoles] = useState({});

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const onSubmit = e => {
    e.preventDefault();
    
    const email = iref.querySelector('[name="email"]').value;
    const password = iref.querySelector('[name="password"]').value;

    signUp(email, password, roles);
  }

  const handleClose = () => {
    toogleShowSignUp();
  };

  const handleCheckBox = event => {
    setRoles({...roles, [event.target.name]: event.target.checked});
  };
  
  if(pending)
    return false;
  
  return (
    <div>
      <Dialog open={showSignUp} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={onSubmit}>
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent ref={node => iref = node}>
            <TextField
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
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Roles:</FormLabel>
              
              {rolesFromServer.map(role => (
                <FormControlLabel
                  key={role}
                  control={
                    <Checkbox
                      name={role}
                      color="default"
                      onChange={handleCheckBox}
                    />
                  }
                  label={role}
                />
              ))}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type='submit' color="primary">
              Sign up
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default SignUp;
