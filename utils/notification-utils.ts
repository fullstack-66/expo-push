import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { faker } from "@faker-js/faker";

export async function schedulePushNotification() {
  const product = faker.commerce.product();
  const price = faker.commerce.price();
  const text = faker.lorem.text().slice(0, 40);
  const data = { product, price };
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `You've got ${product} for $${price}`,
      body: text,
      data: data,
    },
    trigger: { seconds: 2 },
  });
}

export async function registerForPushNotificationsAsync() {
  if (!Constants.expoConfig?.extra?.eas.projectId) return;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })
    ).data;
    console.log(token);
    return token;
  } else {
    alert("Must use physical device for Push Notifications");
    return;
  }
}
