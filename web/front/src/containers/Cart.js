import { connect } from 'react-redux';
import { Cart } from '../components';
import { cart as cartActions, app as appActions } from '../actions';
import { cart as cartSelectors, app as appSelectors } from '../selectors';

const makeMapStateToProps = () => {
  const getCartProducts = cartSelectors.makeCartProducts();
  const getShowCart = appSelectors.makeShowCart();
  const mapStateToProps = (state) => ({
    products: getCartProducts(state),
    showCart: getShowCart(state),
  });
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  toogleShowCart: () => dispatch(appActions.toogleShowCart()),
  removeProduct: (id) => dispatch(cartActions.removeProductFromCart(id)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Cart);
