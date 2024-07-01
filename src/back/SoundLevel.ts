import RNSoundLevel from "react-native-sound-level";

export async function StartListening(
  monitor_interval?: number,
  samplingRate?: number,
) {
  try {
    console.log("Starting the sound level.");
    await RNSoundLevel.start({
      monitoringInterval: monitor_interval,
      samplingRate: samplingRate,
    });
  } catch {
    console.error("Error starting the Lound Level listener.");
  }
}
