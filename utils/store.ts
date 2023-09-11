import { create } from "zustand";
import * as Notifications from "expo-notifications";

interface Store {
  notification: Notifications.Notification | null;
  setNotification: (notification: Notifications.Notification | null) => void;
  notificationResponse: Notifications.NotificationResponse | null;
  setNotificationResponse: (
    notificationResponse: Notifications.NotificationResponse | null
  ) => void;
}

const useStore = create<Store>((set) => ({
  notification: null,
  setNotification: (notification) => set({ notification }),
  notificationResponse: null,
  setNotificationResponse: (notificationResponse) =>
    set({ notificationResponse }),
}));

export default useStore;
