import { Pressable, Text } from "react-native";

export default function Button(props) {
  const { style, onPress, title = "Start" } = props;
  return (
    <Pressable style={style} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
}
