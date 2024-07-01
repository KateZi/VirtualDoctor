import { useCallback, useContext, useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { SpeakingContext, DragDropContext } from "../contexts/AppContext";
import RNSoundLevel from "react-native-sound-level";
import { StartListening } from "../back/SoundLevel";
import styles from "../../style";

const MONITOR_INTERVAL = 250; // in ms
const SAMPLING_RATE = 8000; // default is 22050
const MAX_VOLUME = 6_750;
// const SILENCE_THRESHOLD = 1_750;
const SILENCE_THRESHOLD = 1_000;
const MAX_PAUSE = 1.5; // in sec

export default function TalkingBubble() {
  // const [loudness, setLoudness] = useState(0);
  const loudness = useRef(0);
  const scale = useRef(new Animated.Value(0)).current;
  const { agentSpeaking, userSpeaking, setAgentSpeaking, setUserSpeaking } =
    useContext(SpeakingContext);
  const { dragDrop } = useContext(DragDropContext);
  const timeoutRef = useRef(null);

  const onNewFrameAnim = useCallback((loudness) => {
    Animated.timing(scale, {
      toValue: loudness.current / MAX_VOLUME,
      useNativeDriver: true,
      duration: 100,
    }).start();
  }, []);

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
          // setLoudness(currData);
          loudness.current = currData;
          // if no loud enough speech
          // set the timer to wait for possible speech
          // switch state for VideoPlayer
          if (currData < SILENCE_THRESHOLD) {
            if (timeoutRef.current === null) {
              timeoutRef.current = setTimeout(() => {
                setAgentSpeaking(true);
                // setLoudness(0);
                loudness.current = 0;
                setUserSpeaking(false);
                console.log("Executed the timer");
              }, MAX_PAUSE * 1000);
            }
          } else {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            if (!userSpeaking) {
              setUserSpeaking(true);
            }
          }
          onNewFrameAnim(loudness);
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
  }, [
    agentSpeaking,
    dragDrop,
    onNewFrameAnim,
    setAgentSpeaking,
    setUserSpeaking,
    userSpeaking,
  ]);

  return (
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
  );
}
