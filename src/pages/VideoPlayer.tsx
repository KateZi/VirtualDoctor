import { useContext, useEffect, useRef } from "react";
import { Animated, Image, View } from "react-native";
import { SpeakingContext, DragDropContext } from "../contexts/AppContext";
import images from "../../assets/images/images";
import styles from "../../style";
import Video, { VideoRef } from "react-native-video";
import videos from "../../assets/videos/videos";

export default function VideoPlayer() {
  const videoRef = useRef<VideoRef>(null);
  const videoIdx = useRef(0);
  const background = videos.videoClips[videoIdx.current];
  const { agentSpeaking, end, setAgentSpeaking, setEnd } =
    useContext(SpeakingContext);
  const { setDragDrop } = useContext(DragDropContext);
  const opacity = useRef(new Animated.Value(agentSpeaking ? 1 : 0)).current;

  useEffect(() => {
    console.log({ agentSpeaking });
    console.log({ videoIdx });
    Animated.timing(opacity, {
      toValue: agentSpeaking ? 1 : 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [agentSpeaking]);

  const handleEnd = () => {
    console.log("Handling end");
    setAgentSpeaking(false);
    if (videoIdx.current < videos.videoClips.length - 1) {
      if (videoIdx.current === 2) {
        setDragDrop(true);
      }
      videoIdx.current += 1;
      videoRef.current.seek(0);
    } else {
      console.log("Setting up end.");
      setEnd(true);
    }
  };

  return (
    !end && (
      <View style={styles.videoContainerStyling}>
        {console.log("Rerendered video.")}
        <Image source={images["doctor"]} style={styles.avatarImageStyling} />
        <Animated.View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: opacity,
            zIndex: 2,
          }}
        >
          <Video
            source={background}
            ref={videoRef}
            style={{ ...styles.backgroundVideo }}
            paused={!agentSpeaking}
            onEnd={handleEnd}
          />
        </Animated.View>
      </View>
    )
  );
}
