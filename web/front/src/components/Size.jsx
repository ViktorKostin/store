import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  active: {
    border: 'solid',
    borderWidth: 'thin',
    borderColor: '#aaa'
  },
});

const Size = ({toogleSize, value, active}) => {
  const classes = useStyles();

  return (
    <Button onClick={toogleSize} className={active ? classes.active : ''}>
      {value}
    </Button>
  );
};

export default Size;
