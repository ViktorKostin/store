import {Grid} from '@material-ui/core';
import Product from '../containers/Product';
import Pagination from '../containers/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 83
  },
}));

const Products = ({products}) => {
  const classes = useStyles();

  return (
    <Grid container justify='center' className={classes.root} spacing={3}>
      <Pagination />
      {products.map(product => 
        <Product key={product._id} {...product} />
      )}
    </Grid>
  );
};

export default Products;
