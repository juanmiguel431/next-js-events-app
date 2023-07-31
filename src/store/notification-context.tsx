import React, { createContext, PropsWithChildren, useState } from 'react';
import { NotificationFooterProps } from '@/models';

interface NotificationContextDef {
  notification: NotificationFooterProps | null;
  showNotification: ((notification: NotificationFooterProps) => void) | null;
  hideNotification: (() => void) | null;
}

const NotificationContext = createContext<NotificationContextDef>({
  notification: null,
  showNotification: null,
  hideNotification: null
});

export const NotificationContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState<NotificationFooterProps | null>(null);

  const showNotificationHandler = React.useCallback((notification: NotificationFooterProps) => {
    setActiveNotification(notification);
  }, []);

  const hideNotificationHandler = React.useCallback(() => {
    setActiveNotification(null);
  }, []);

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
