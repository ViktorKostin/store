import { connect } from 'react-redux';
import { Product } from '../components';
import { products } from '../actions';
import { auth as authSelectors } from '../selectors';

const makeMapStateToProps = () => {
  const getIsAdmin = authSelectors.makeIsAdmin();
  const mapStateToProps = (state) => {
    return {
      isAdmin: getIsAdmin(state),
    }
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  removeProductFromStore: (productId) => dispatch(products.removeProductFromStore(productId)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Product);
