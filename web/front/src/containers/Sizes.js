import { connect } from 'react-redux';
import { products as productsActions } from '../actions';
import { Sizes } from '../components';
import { products as productsSelectors } from '../selectors';

const makeMapStateToProps = () => {
  const getSizes = productsSelectors.makeGetSizesWithState();
  const mapStateToProps = (state, props) => {
    return {
      sizes: getSizes(state, props),
    }
  };
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  toogleSize: (id, size) => dispatch(productsActions.toogleSize(id, size)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Sizes);
