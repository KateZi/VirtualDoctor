import { Platform } from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";

export default async function RequestPermissions(): Promise<boolean> {
  try {
    const statuses =
      Platform.OS === "android"
        ? await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
        : await request(PERMISSIONS.IOS.MICROPHONE);
    return statuses === "granted";
  } catch {
    console.error("Error in request permissions");
  }
}
