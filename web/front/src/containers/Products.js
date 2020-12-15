import { connect } from 'react-redux';
import { Products } from '../components';
import { app } from '../actions';
import { products } from '../selectors';

const makeMapStateToProps = () => {
  const getProducts = products.makeProducts();
  const mapStateToProps = (state, props) => {
    return {
      products: getProducts(state),
    }
  };
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  setPage: (page) => dispatch(app.setPage(page)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Products);
