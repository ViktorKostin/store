import { connect } from 'react-redux';
import { ChatUsers } from '../components';
import { chat as chatSelectors } from '../selectors';
import { chat as chatActions } from '../actions';

const makeMapStateToProps = () => {
  const getUsers = chatSelectors.makeUsers();
  const getCountUsers = chatSelectors.makeCount();
  const mapStateToProps = (state) => {
    return {
      users: getUsers(state),
      countUsers: getCountUsers(state),
    }
  };
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  setReciever: (userId) => dispatch(chatActions.setReciever(userId)),
  setReaded: (user) => dispatch(chatActions.setMessageReaded(user)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(ChatUsers);
