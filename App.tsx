import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import {
  StyledSafeAreaView,
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledScrollView,
  StyledIcon,
  StyledStatusBar,
} from "./utils/nativewind-styled";
import DisplayNotification from "./components/DisplayNotification";
import DisplayNotificationResponse from "./components/DisplayNotificationResponse";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "./utils/notification-utils";
import DisplayExpoToken from "./components/DisplayExpoToken";
import useStore from "./utils/store";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>("");
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const [setNotification, setNotificationResponse] = useStore((state) => [
    state.setNotification,
    state.setNotificationResponse,
  ]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setNotificationResponse(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <StyledSafeAreaView className="flex-1">
      <StyledStatusBar barStyle="default" backgroundColor={"#9370DB"} />
      <StyledView className="flex-1 px-4 items-center mt-4" style={{ gap: 30 }}>
        <DisplayExpoToken expoPushToken={expoPushToken} />

        <StyledView className="flex-row items-center" style={{ gap: 10 }}>
          <StyledTouchableOpacity
            className="bg-purple-600 py-2 px-3 rounded-lg"
            onPress={schedulePushNotification}
          >
            <StyledText className="text-xl text-white font-bold">
              Schedule Notification
            </StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            onPress={() => {
              setNotification(null);
              setNotificationResponse(null);
            }}
          >
            <StyledIcon name="trash" size={24} className="text-gray-400" />
          </StyledTouchableOpacity>
        </StyledView>
        <StyledScrollView className="flex-1 w-full">
          <StyledView style={{ gap: 30 }}>
            <DisplayNotification />
            <DisplayNotificationResponse />
          </StyledView>
        </StyledScrollView>
      </StyledView>
    </StyledSafeAreaView>
  );
}
