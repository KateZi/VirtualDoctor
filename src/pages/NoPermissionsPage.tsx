import { Text, View } from "react-native";
import styles from "../../style";

export default function NoPermissionPage({
  permissionName,
}: {
  permissionName: string;
}) {
  return (
    <View style={{ ...styles.containerStyling, alignItems: "center" }}>
      <Text style={{ top: "50%" }}>
        Sorry, cannot work without the {permissionName} permissions
      </Text>
    </View>
  );
}
