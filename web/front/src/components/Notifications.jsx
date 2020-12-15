import { useRef, useEffect } from 'react';
import NotificationSystem from 'react-notification-system';

const Notifications = ({ notifications, remove }) => {
  let iref = useRef();

  useEffect(() => {
    notifications.map(notification => 
      iref.addNotification({
        ...notification,
        uid: notification.id,
        dismissible: 'none',
        position: 'br',
        onRemove: () => remove(notification.id)
      })
    )
  }, [notifications, remove]);

  return (
    <NotificationSystem ref={node => iref = node} />
  );
};

export default Notifications;
