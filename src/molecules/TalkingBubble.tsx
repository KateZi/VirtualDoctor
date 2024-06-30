import { useContext, useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { AgentSpeaking, DragDrop } from "../back/AppContext";
import RNSoundLevel from "react-native-sound-level";
import { StartListening } from "../back/SoundLevel";
import styles from "../../style";

const MONITOR_INTERVAL = 250; // in ms
const SAMPLING_RATE = 8000; // default is 22050
const MAX_VOLUME = 6_750;
// const SILENCE_THRESHOLD = 1_750;
const SILENCE_THRESHOLD = 800;
const MAX_PAUSE = 1; // in sec

export default function TalkingBubble() {
  const [loudness, setLoudness] = useState(0);
  const scale = useRef(new Animated.Value(0)).current;
  const { agentSpeaking, setAgentSpeaking } = useContext(AgentSpeaking);
  const { dragDrop } = useContext(DragDrop);
  const timeoutRef = useRef(null);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: loudness / MAX_VOLUME,
      useNativeDriver: true,
      duration: 250,
    }).start();
  }, [loudness]);

  // use effect for starting and stopping
  useEffect(() => {
    StartListening(MONITOR_INTERVAL, SAMPLING_RATE);
    return () => {
      try {
        // don't forget to stop it
        console.log("Stopping the sound level");
        RNSoundLevel.stop();
      } catch {
        console.error("Error stopping the Sound Level Listener");
      }
    };
  }, []);

  useEffect(() => {
    try {
      RNSoundLevel.onNewFrame = (data) => {
        if (!agentSpeaking && !dragDrop) {
          const currData = data.rawValue;
          console.log(currData);
          setLoudness(currData);
          // if no loud enough speech
          // set the timer to wait for possible speech
          // switch state for VideoPlayer
          if (currData < SILENCE_THRESHOLD) {
            timeoutRef.current = setTimeout(() => {
              setAgentSpeaking(true);
              setLoudness(0);
            }, MAX_PAUSE * 1000);
          } else {
            clearTimeout(timeoutRef.current);
          }
        }
      };
    } catch {
      console.error("Error reading a frame");
    }
    return () => {
      try {
        clearTimeout(timeoutRef.current);
      } catch {
        console.error("Error clearing the timer.");
      }
    };
  }, [agentSpeaking]);

  return (
    <View style={styles.bubbleContainerStyling}>
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
  );
}
