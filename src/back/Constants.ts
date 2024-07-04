import * as FileSystem from "expo-file-system";
import { sessionName } from "./DirUtils";

export const AUDIO_PATH = `${FileSystem.documentDirectory}${sessionName}/audio`;
export const TRANSCRIPTION_PATH = `${FileSystem.documentDirectory}${sessionName}/transcriptions`;
export const TOUCH_FILE = `${FileSystem.documentDirectory}${sessionName}/touch/touchData.json`;
export const ACC_FILE = `${FileSystem.documentDirectory}${sessionName}/IMU/accData.json`;
export const ROT_FILE = `${FileSystem.documentDirectory}${sessionName}/IMU/rotData.json`;
