import { connect } from 'react-redux';
import { AddProductToStore } from '../components';
import  { products as productsActions, app as appActions } from '../actions';
import { app as appSelectors } from '../selectors';

const makeMapStateToProps = () => {
  const getShowAddProductToStore = appSelectors.makeShowAddProductToStore();
  const mapStateToProps = (state) => {
    return {
      showAddProductToStore: getShowAddProductToStore(state),
    }
  }
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  addProduct: (object) => dispatch(productsActions.addProductToStore(object)),
  toogleShowAddProductToStore: (object) => dispatch(appActions.toogleShowAddProductToStore(object)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(AddProductToStore);
