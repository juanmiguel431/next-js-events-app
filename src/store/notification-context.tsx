import React, { createContext, PropsWithChildren, useEffect, useState, useCallback } from 'react';
import { NotificationFooterProps } from '@/models';

interface NotificationContextDef {
  notification: NotificationFooterProps | null;
  showNotification: ((notification: NotificationFooterProps) => void);
  hideNotification: (() => void);
}

const NotificationContext = createContext<NotificationContextDef>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {}
});

export const NotificationContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState<NotificationFooterProps | null>(null);

  const showNotificationHandler = useCallback((notification: NotificationFooterProps) => {
    setActiveNotification(notification);
  }, []);

  const hideNotificationHandler = useCallback(() => {
    setActiveNotification(null);
  }, []);

  useEffect(() => {
    if (activeNotification && activeNotification.status === 'success') {
      setTimeout(() => {
        hideNotificationHandler();
      }, 3000);
    }
  }, [activeNotification, hideNotificationHandler])

  return (
    <NotificationContext.Provider value={{
      hideNotification: hideNotificationHandler,
      showNotification: showNotificationHandler,
      notification: activeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
