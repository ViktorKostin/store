import { connect } from 'react-redux';
import { Notifications } from '../components';
import  { notifications as actions } from '../actions';
import { notifications as selectors } from '../selectors';

const makeMapStateToProps = () => {
  const getNotifications = selectors.makeNotifications();
  const mapStateToProps = (state) => {
    return {
      notifications: getNotifications(state),
    }
  };
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(actions.removeNotification(id)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Notifications);
