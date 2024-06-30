import { request, PERMISSIONS } from "react-native-permissions";

export default async function RequestPermissions(): Promise<boolean> {
  try {
    const statuses = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    return statuses === "granted";
  } catch {
    console.error("Error in request permissions");
  }
}
