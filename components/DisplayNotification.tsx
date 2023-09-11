import { StyledView, StyledText } from "../utils/nativewind-styled";
import ListItem from "./ListItem";
import useStore from "../utils/store";

export default function DisplayNotification() {
  const [notification] = useStore((state) => [state.notification]);
  if (!notification) return <StyledView />;
  return (
    <StyledView className="bg-purple-200 p-3 rounded-xl" style={{ gap: 10 }}>
      <StyledText className="text-xl text-purple-800 font-bold text-center">
        Notification
      </StyledText>
      <StyledView style={{ gap: 10 }}>
        <ListItem title="Title" value={notification.request.content.title} />
        <ListItem title="Body" value={notification.request.content.body} />
        <ListItem
          title="Data"
          value={JSON.stringify(notification.request.content.data)}
        />
        <StyledText className="border rounded-xl p-2 bg-gray-100 border-gray-400">
          {JSON.stringify(notification, null, 2)}
        </StyledText>
      </StyledView>
    </StyledView>
  );
}
