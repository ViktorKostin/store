import { connect } from 'react-redux';
import { TopBar } from '../components';
import {
  auth as authSelectors,
  cart as cartSelectors,
  chat as chatSelectors,
} from '../selectors';
import {
  app as appActions,
  auth as authActions,
} from '../actions';

const makeMapStateToProps = () => {
  const getIsLogged = authSelectors.makeIsLogged();
  const getIsAdmin = authSelectors.makeIsAdmin();
  const getCartProductsCount = cartSelectors.makeCartProductsCount();
  const getUsers = chatSelectors.makeUsers();
  const getCountUsers = chatSelectors.makeCount();
  const mapStateToProps = (state) => {
    return {
      isLogged: getIsLogged(state),
      isAdmin: getIsAdmin(state),
      productsCount: getCartProductsCount(state),
      users: getUsers(state),
      countUsers: getCountUsers(state),
    }
  };
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  toogleShowCart: () => dispatch(appActions.toogleShowCart()),
  toogleShowLogin: () => dispatch(appActions.toogleShowLogin()),
  toogleShowSignUp: () => dispatch(appActions.toogleShowSignUp()),
  toogleShowAddProductToStore: () => dispatch(appActions.toogleShowAddProductToStore()),
  logout: () => dispatch(authActions.logout()),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(TopBar);
