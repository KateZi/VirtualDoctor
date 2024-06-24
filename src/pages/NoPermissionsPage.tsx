import { Text, View } from "react-native";
import styles from "../../style";

interface PermissionPageProps {
  permissionName: string;
}

export default function NoPermissionPage({
  permissionName,
}: PermissionPageProps) {
  return (
    <View style={{ ...styles.containerStyling, alignItems: "center" }}>
      <Text style={{ top: "50%" }}>
        Sorry, cannot work without the {permissionName} permissions
      </Text>
    </View>
  );
}
