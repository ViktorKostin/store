import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: '9999 !important',
  },
  table: {
    minWidth: 650,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  img: {
    width: 300,
  }
}));


const Cart = ({products, removeProduct, showCart, toogleShowCart}) => {
  const classes = useStyles();

  const handleClose = () => {
    toogleShowCart();
  };

  return (
    <Dialog className={classes.root} fullScreen open={showCart} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Cart</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Sizes</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell component="th">{product.title}</TableCell>
                  <TableCell><img className={classes.img} src={`/images/${product.image}`} alt={product.title} /></TableCell>
                  <TableCell>
                  {product.sizes.map(size => (
                    <span key={size}>{size} </span>
                  ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => removeProduct(product.id)}
                >
                  remove
                </Button>
              </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button type='submit' color="primary">
          Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
