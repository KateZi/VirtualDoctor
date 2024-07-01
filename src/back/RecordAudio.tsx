import { useContext, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  RecordingOptionsPresets,
} from "expo-av/build/Audio";
import * as FileSystem from "expo-file-system";
import { SpeakingContext } from "../contexts/AppContext";
import TranscribeAudio from "./Transcription";

const AUDIO_PATH = FileSystem.documentDirectory + "audio";

export default function RecordAudio() {
  const { userSpeaking } = useContext(SpeakingContext);
  const isRecording = useRef(false);
  const recording = useRef(null);

  useEffect(() => {
    if (userSpeaking) {
      prepareStartRecording();
    } else {
      stopSaveRecording();
    }
    return () => {
      // if (isRecording.current) {
      //   try {
      //     console.log("Unmounting and stopping.")
      //     recording.current.stopAndUnloadAsync();
      //   } catch (error) {
      //     console.error("Error onUnmount.", error);
      //   }
      //   recording.current = null;
      // }
    };
  }, [userSpeaking]);

  async function prepareStartRecording() {
    if (!isRecording.current) {
      try {
        console.log("Creating the recording.");
        recording.current = new Audio.Recording();
      } catch (error) {
        console.error("Error creating recording.", error);
      }
    }
    // if not already recording prepare and start the recording
    try {
      console.log("Preparing the recording");
      await recording.current.prepareToRecordAsync({
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
    } catch (error) {
      console.error("Error preparing the recording.", error);
    }
    try {
      console.log("Starting to record");
      await recording.current.startAsync();
      // set the flag that we're recording
      isRecording.current = true;
    } catch (error) {
      console.error("Error starting the recording", error);
    }
  }

  async function stopSaveRecording() {
    if (isRecording.current) {
      try {
        console.log("Stopping and unloading the recording");
        await recording.current.stopAndUnloadAsync();
        isRecording.current = false;
      } catch (error) {
        console.error("Error stopping and unloading the recording", error);
      }
      const uri = recording.current.getURI();
      recording.current = null;
      // console.log(uri);
      const id = new Date().toISOString();
      const filePath = AUDIO_PATH + `/user_${id}.mp4`;
      try {
        console.log("Moving the recording to its correct location");
        await FileSystem.moveAsync({ from: uri, to: filePath });
      } catch (error) {
        console.error(
          "Error moving the recording to the correct location",
          error,
        );
      }
      try {
        // console.log("Forming data");
        // const formData = await PrepareData(filePath);
        // TranscribeAudio({ body: formData });
        console.log("Sending to transcribe");
        TranscribeAudio({ filePath: filePath });
      } catch (error) {
        console.error("Error sending to transcribe.", error);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function PrepareData(filePath: string) {
    try {
      const formData = new FormData();
      formData.append("model", "whisper-1");

      const fileUri = filePath.startsWith("file://")
        ? filePath
        : `file://${filePath}`;
      // console.log(fileUri);
      // console.log(filePath.split("/").pop());
      formData.append("file", {
        uri: fileUri,
        name: filePath.split("/").pop(),
        type: "audio/mp4",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      formData.append("language", "en");
      formData.append("prompt", "make a trascription");
      formData.append("response_format", "text");
      return formData;
    } catch (error) {
      console.error("Error forming the data.", error);
    }
  }

  return <>{console.log("Recorder got rerendered", recording)}</>;
}
