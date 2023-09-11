import { StyledView, StyledText } from "../utils/nativewind-styled";

interface DisplayExpoTokenProps {
  expoPushToken: String | undefined;
}

export default function DisplayExpoToken({
  expoPushToken,
}: DisplayExpoTokenProps) {
  if (!expoPushToken) return <StyledView />;
  return (
    <StyledView
      className="items-center bg-gray-200 rounded-xl p-4"
      style={{ gap: 10 }}
    >
      <StyledText className="text-xl text-purple-800 font-bold">
        Expo Push Token
      </StyledText>
      <StyledText
        className="bg-purple-400 p-2 rounded-md text-white text-center"
        selectable={true}
      >
        {expoPushToken}
      </StyledText>
    </StyledView>
  );
}
