import { connect } from 'react-redux';
import { SignUp } from '../components';
import {
  app as appActions,
  auth as authActions,
} from '../actions';
import { app as appSelectors } from '../selectors';

const makeMapStateToProps = () => {
  const getShowSignUp = appSelectors.makeShowSignUp();
  const getRoles = appSelectors.makeRoles();
  const getPending = appSelectors.makePending();
  const mapStateToProps = (state) => {
    return {
      showSignUp: getShowSignUp(state),
      rolesFromServer: getRoles(state),
      pending: getPending(state),
    }
  };
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  toogleShowSignUp: () => dispatch(appActions.toogleShowSignUp()),
  signUp: (email, password, roles) => dispatch(authActions.signUp(email, password, roles)),
  fetchRoles: () => dispatch(appActions.fetchRoles()),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(SignUp);
