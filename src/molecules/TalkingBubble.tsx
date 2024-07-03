import { useCallback, useContext, useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { SpeakingContext, DragDropContext } from "../contexts/AppContext";
import RNSoundLevel from "react-native-sound-level";
import { StartListening } from "../back/SoundLevel";
import styles from "../../style";
import {
  prepareRecording,
  startRecording,
  stopSaveRecording,
} from "../back/RecordAudio";
import { Audio } from "expo-av";

const MONITOR_INTERVAL = 250; // in ms
const SAMPLING_RATE = 8000; // default is 22050
const MAX_VOLUME = 6_750;
// const SILENCE_THRESHOLD = 1_750;
const SILENCE_THRESHOLD = 1_500;
const MAX_PAUSE = 1.5; // in sec

export default function TalkingBubble() {
  const loudness = useRef(0);
  const scale = useRef(new Animated.Value(0)).current;
  const { agentSpeaking, end, setAgentSpeaking } = useContext(SpeakingContext);
  const { dragDrop } = useContext(DragDropContext);
  const timeoutRef = useRef(null);
  const startedListening = useRef(false);
  const recording = useRef<Audio.Recording | null>(null);

  // use effect for starting and stopping
  useEffect(() => {
    if (!agentSpeaking && !dragDrop && !end) {
      StartListening(MONITOR_INTERVAL, SAMPLING_RATE);
      startedListening.current = true;
      startRecordingAnimation();
    }
    return () => {
      if (startedListening.current) {
        try {
          // don't forget to stop it
          console.log("Stopping the sound level");
          RNSoundLevel.stop();
          startedListening.current = false;
        } catch {
          console.error("Error stopping the Sound Level Listener");
        }
      }
      if (recording.current !== null) {
        try {
          recording.current.stopAndUnloadAsync();
          recording.current = null;
        } catch (error) {
          console.error("Error stopping on unload");
        }
      }
      try {
        console.log("Clearing timeout");
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      } catch (error) {
        console.error("Error clearing the timout.", error);
      }
    };
  }, [agentSpeaking, end]);

  const startRecordingAnimation = async () => {
    try {
      recording.current = await prepareRecording();
      recording.current = await startRecording(recording.current);
      RNSoundLevel.onNewFrame = (data) => {
        const currData = data.rawValue;
        // if no loud enough speech
        // set the timer to wait for possible speech
        // switch state for agentSpeaking
        if (currData < SILENCE_THRESHOLD) {
          if (timeoutRef.current === null) {
            timeoutRef.current = setTimeout(() => {
              stopSaveRecording(recording.current);
              setAgentSpeaking(true);
              recording.current = null;
              console.log("Executed the timer");
            }, MAX_PAUSE * 1000);
          }
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }
        loudness.current = currData;
        onNewFrameAnim(loudness);
      };
    } catch {
      console.error("Error reading a frame");
    }
  };

  const onNewFrameAnim = useCallback((loudness) => {
    Animated.timing(scale, {
      toValue: loudness.current / MAX_VOLUME,
      useNativeDriver: true,
      duration: 100,
    }).start();
  }, []);

  return (
    !end && (
      <View style={styles.bubbleContainerStyling}>
        {console.log("Rerendered bubble.")}
        {!agentSpeaking && !dragDrop && (
          <>
            <Animated.View
              style={[
                {
                  ...styles.talkingBubbleStyling,
                  transform: [
                    {
                      scale: scale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 2],
                        extrapolate: "clamp", // clamp prevents exceeding max range size
                      }),
                    },
                  ],
                },
              ]}
            ></Animated.View>
            <View style={styles.centerBubbleStyling} />
          </>
        )}
      </View>
    )
  );
}
