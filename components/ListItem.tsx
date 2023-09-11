import { StyledView, StyledText } from "../utils/nativewind-styled";

interface ListItemProps {
  title: string;
  value: string | number | null | undefined | boolean;
}

export default function ListItem({ title, value }: ListItemProps) {
  const valueTxt = value?.toString() ?? "-";
  return (
    <StyledView className="flex-row items-center gap-2">
      <StyledText className="bg-gray-400 text-white px-2 py-1 rounded-lg font-bold">
        {title}
      </StyledText>
      <StyledText className="">{valueTxt}</StyledText>
    </StyledView>
  );
}
