import { connect } from 'react-redux';
import { AddProductToCart } from '../components';
import { cart } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  addProduct: (productId) => dispatch(cart.addProductToCart(productId)),
});

export default connect(null, mapDispatchToProps)(AddProductToCart);
