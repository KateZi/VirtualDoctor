/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeviceMotion } from "expo-sensors";
import { AppendWriteBufferToFile } from "./DirUtils";
import { ACC_FILE, ROT_FILE } from "./Constants";

const BUFFER_SIZE = 30;
const accelerationData = [];
const rotationData = [];

export function StartSensors() {
  DeviceMotion.addListener(({ acceleration, rotation }) => {
    accelerationData.push(acceleration);
    rotationData.push(rotation);

    if (accelerationData.length >= BUFFER_SIZE) {
      AppendWriteBufferToFile({
        fileUri: ACC_FILE,
        data: accelerationData,
      });
    }
    if (rotationData.length >= BUFFER_SIZE) {
      AppendWriteBufferToFile({ fileUri: ROT_FILE, data: rotationData });
    }
  });

  return [accelerationData, rotationData];
}

export async function StopSensors() {
  if (accelerationData.length > 0) {
    AppendWriteBufferToFile({
      fileUri: ACC_FILE,
      data: accelerationData,
    });
  }
  if (rotationData.length > 0) {
    AppendWriteBufferToFile({ fileUri: ROT_FILE, data: rotationData });
  }

  DeviceMotion.removeAllListeners();
}
