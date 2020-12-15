import { connect } from 'react-redux';
import { Pagination } from '../components';
import { app as appActions, products as productsActions } from '../actions';
import { app as appSelectors } from '../selectors';

const makeMapStateToProps = () => {
  const getPage = appSelectors.makePage();
  const getPerPage = appSelectors.makePerPage();
  const getMaxPages = appSelectors.makeMaxPages();
  const mapStateToProps = (state, props) => {
    return {
      page: getPage(state),
      perPage: getPerPage(state),
      maxPages: getMaxPages(state),
    }
  };
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  fetchProducts: (page, perPage) => dispatch(productsActions.fetchProducts(page, perPage)),
  setPage: (page) => dispatch(appActions.setPage(page)),
  fetchMaxPages: () => dispatch(appActions.fetchMaxPages()),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Pagination);
