import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import Video, { VideoRef } from "react-native-video";
import TemporalComponent from "./src/atoms/TemporalComponent";
import MovingSmiley from "./src/molecules/MovingSmiley";
import styles from "./style";
import TalkingBubble from "./src/molecules/TalkingBubble";
import NoPermissionPage from "./src/pages/NoPermissionsPage";
import { RequestPermissions } from "./src/back/SoundLevel";
import videos from "./assets/videos/videos";

export default function App() {
  const success = useRef(RequestPermissions());

  const delay = 14;
  const duration = 7;
  // const delay = 0
  // const duration = 120

  const videoRef = useRef<VideoRef>(null);
  const background = videos["smallDoctorv2"];

  const [showComponent, setShowComponent] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showComponent) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start();
    }
  }, [showComponent]);

  return (
    <>
      {success ? (
        <View style={styles.containerStyling}>
          <View style={styles.videoContainerStyling}>
            <Video
              source={background}
              ref={videoRef}
              style={styles.backgroundVideo}
            />
          </View>
          <Animated.View
            style={{
              ...styles.bubbleContainerStyling,
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}
          >
            <TalkingBubble />
          </Animated.View>
          <Animated.View
            style={{
              ...styles.temporalBlobStyling,
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          >
            <TemporalComponent
              delay={delay}
              duration={duration}
              setShowComponent={setShowComponent}
            >
              {/* <SliderBar/> */}
              <MovingSmiley />
            </TemporalComponent>
          </Animated.View>
        </View>
      ) : (
        <NoPermissionPage permissionName={"Mic"}></NoPermissionPage>
      )}
    </>
  );
}
