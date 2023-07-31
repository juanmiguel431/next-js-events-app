import React, { useContext } from 'react';

import classes from './notification-footer.module.css';
import { NotificationFooterProps } from '@/models';
import NotificationContext from '@/store/notification-context';

const NotificationFooter: React.FC<NotificationFooterProps> = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const { title, message, status } = props;
  const activeClasses = `${classes.notification} ${classes[status]}`;

  return (
    <div
      className={activeClasses}
      onClick={() => {
        if (notificationCtx.hideNotification) {
          notificationCtx.hideNotification();
        }
      }}
    >
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default NotificationFooter;
