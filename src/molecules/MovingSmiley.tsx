import { useRef } from "react";
import Smiley from "../atoms/Smiley";
import { Animated, Dimensions, PanResponder, View } from "react-native";
import styles from "../../style";

export default function MovingSmiley() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const smileyXY = { top: 40, left: windowWidth - 125 };
  const outlineXY = { top: windowHeight - 300, left: windowWidth / 3 };
  const blobDims = {
    width: styles.blobStyling["width"],
    height: styles.blobStyling["height"],
  };

  const isOverTarget = (gesture) => {
    return (
      gesture.moveX > outlineXY["left"] &&
      gesture.moveX < outlineXY["left"] + blobDims["width"] &&
      gesture.moveY > outlineXY["top"] &&
      gesture.moveY < outlineXY["top"] + blobDims["height"]
    );
  };

  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        return Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (isOverTarget(gestureState)) {
          const snapDist = {
            x: outlineXY["left"] - smileyXY["left"],
            y: outlineXY["top"] - smileyXY["top"],
          };
          Animated.sequence([
            Animated.spring(pan, {
              toValue: snapDist,
              useNativeDriver: true,
              speed: 20,
            }),
            Animated.timing(scale, {
              toValue: 1.25,
              useNativeDriver: true,
              duration: 50,
            }),
            Animated.timing(scale, {
              toValue: 1,
              useNativeDriver: true,
              duration: 50,
            }),
          ]).start(() => {
            Animated.timing(opacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }).start();
          });
        }
      },
    })
  ).current;

  return (
    <Animated.View style={{ opacity: opacity }}>
      <View style={{ ...outlineXY, position: "absolute" }}>
        <Smiley target={true}></Smiley>
      </View>
      <Animated.View
        style={{
          ...smileyXY,
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: scale },
          ],
        }}
        {...panResponder.panHandlers}
      >
        <Smiley target={false}></Smiley>
      </Animated.View>
    </Animated.View>
  );
}
