import { Audio } from "expo-av";
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  RecordingOptionsPresets,
} from "expo-av/build/Audio";
import * as FileSystem from "expo-file-system";
import TranscribeAudio from "./Transcription";
import { formatDate } from "./DirUtils";
import { AUDIO_PATH } from "./Constants";

export async function prepareRecording() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  const recording = new Audio.Recording();
  // if not already recording prepare and start the recording
  try {
    console.log("Preparing the recording");
    await recording.prepareToRecordAsync({
      android: {
        extension: ".mp4",
        outputFormat: AndroidOutputFormat.MPEG_4,
        audioEncoder: AndroidAudioEncoder.AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        // bitRate: 16000,
      },
      ios: RecordingOptionsPresets.HIGH_QUALITY.ios,
      web: RecordingOptionsPresets.HIGH_QUALITY.web,
    });
    return recording;
  } catch (error) {
    console.error("Error preparing the recording.", error);
  }
}

export async function startRecording(recording: Audio.Recording) {
  try {
    console.log("Starting to record");
    await recording.startAsync();
    return recording;
  } catch (error) {
    console.error("Error starting the recording", error);
  }
}

export async function stopSaveRecording(recording: Audio.Recording) {
  try {
    console.log("Stopping and unloading the recording");
    await recording.stopAndUnloadAsync();
  } catch (error) {
    console.error("Error stopping and unloading the recording", error);
  }
  const uri = recording.getURI();
  const id = formatDate({ date: new Date(), full: true });
  const filePath = AUDIO_PATH + `/user_${id}.mp4`;
  try {
    console.log("Moving the recording to its correct location");
    await FileSystem.moveAsync({ from: uri, to: filePath });
  } catch (error) {
    console.error("Error moving the recording to the correct location", error);
  }
  try {
    console.log("Sending to transcribe");
    TranscribeAudio({ filePath: filePath });
  } catch (error) {
    console.error("Error sending to transcribe.", error);
  }
}
