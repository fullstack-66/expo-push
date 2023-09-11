import { StyledView, StyledText } from "../utils/nativewind-styled";
import ListItem from "./ListItem";
import useStore from "../utils/store";
export default function DisplayNotificationResponse() {
  const [NR] = useStore((state) => [state.notificationResponse]);
  if (!NR) return <StyledView />;
  return (
    <StyledView className="bg-blue-200 p-3 rounded-xl" style={{ gap: 10 }}>
      <StyledText className="text-xl text-blue-800 font-bold text-center">
        Notification Response
      </StyledText>
      <StyledView style={{ gap: 10 }}>
        <ListItem title="Title" value={NR.notification.request.content.title} />
        <ListItem title="Body" value={NR.notification.request.content.body} />
        <ListItem
          title="Data"
          value={JSON.stringify(NR.notification.request.content.data)}
        />

        <StyledText className="border rounded-xl p-2 bg-gray-100 border-gray-400">
          {JSON.stringify(NR, null, 2)}
        </StyledText>
      </StyledView>
    </StyledView>
  );
}
