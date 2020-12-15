import { connect } from 'react-redux';
import { Chat } from '../components';
import {
  auth as authSelectors,
  app as appSelectors,
  chat as chatSelectors,
} from '../selectors';
import {
  chat as chatActions,
} from '../actions';

const makeMapStateToProps = () => {
  const getUser = authSelectors.makeUser();
  const getIsLogged = authSelectors.makeIsLogged();
  const getIsAdmin = authSelectors.makeIsAdmin();
  const getSocket = appSelectors.makeSocket();
  const getReciever = chatSelectors.makeReciever();
  const mapStateToProps = (state) => {
    return {
      user: getUser(state),
      isLogged: getIsLogged(state),
      isAdmin: getIsAdmin(state),
      socket: getSocket(state),
      reciever: getReciever(state),
    }
  };
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(chatActions.addUser(user)),
  setReciever: (userId) => dispatch(chatActions.setReciever(userId)),
  removeUser: (userId) => dispatch(chatActions.removeUser(userId)),
  newMessage: (user) => dispatch(chatActions.setMessageNotReaded(user)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Chat);
