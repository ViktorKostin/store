import { connect } from 'react-redux';
import { Login } from '../components';
import { auth, app as appActions } from '../actions';
import { app as appSelectors } from '../selectors';

const makeMapStateToProps = () => {
  const getShowLogin = appSelectors.makeShowLogin();
  const mapStateToProps = (state) => {
    return {
      showLogin: getShowLogin(state),
    }
  };
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  toogleShowLogin: () => dispatch(appActions.toogleShowLogin()),
  login: (email, password) => dispatch(auth.login(email, password)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Login);
