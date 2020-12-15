import { createSelector } from 'reselect';

const getNotifications = (state) => state.notifications;

const makeNotifications = () => {
  return createSelector(
    getNotifications,
    notifications => notifications
  );
};

const notifications = {
  makeNotifications,
};

export default notifications;
