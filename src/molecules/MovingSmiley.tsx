import { useContext, useRef } from "react";
import { Animated, Dimensions, PanResponder, View } from "react-native";
import { SpeakingContext, DragDropContext } from "../contexts/AppContext";
import Smiley from "../atoms/Smiley";
import styles from "../../style";
import { AppendWriteBufferToFile, formatDate } from "../back/DirUtils";
import { TOUCH_FILE } from "../back/Constants";

const BUFFER_SIZE = 30;

export default function MovingSmiley() {
  const { dragDrop, setDragDrop } = useContext(DragDropContext);
  const { setAgentSpeaking } = useContext(SpeakingContext);

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
  const panBuffer = useRef([]).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        panBuffer.push({
          component: "DragDrop",
          timestamp: formatDate({ date: new Date() }),
          x: gestureState.moveX,
          y: gestureState.moveY,
        });

        if (panBuffer.length >= BUFFER_SIZE) {
          AppendWriteBufferToFile({ fileUri: TOUCH_FILE, data: panBuffer });
        }

        return Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        pan.extractOffset();
        if (isOverTarget(gestureState)) {
          pan.flattenOffset();
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
            Animated.timing(opacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }),
          ]).start(() => {
            if (panBuffer.length > 0) {
              AppendWriteBufferToFile({
                fileName: TOUCH_FILE,
                data: panBuffer,
              });
            }
            setDragDrop(false);
            setAgentSpeaking(true);
            pan.extractOffset();
          });
        }
      },
    }),
  ).current;

  return (
    <>
      {dragDrop && (
        <Animated.View
          style={{ ...styles.temporalBlobStyling, opacity: opacity }}
        >
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
      )}
    </>
  );
}
