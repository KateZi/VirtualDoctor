import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerStyling: {
    flex: 1,
    // backgroundColor: 'rgb(235, 234, 233)',
    backgroundColor: "white",
    alignItems: "center",
  },
  // for the bar
  temporalBarStyling: {
    position: "absolute",
    bottom: 70,
    height: 60,
    width: "100%",
  },
  barStyling: {
    backgroundColor: "white",
    borderColor: "orange",
    borderRadius: 10,
    borderWidth: 10,
    elevation: 2,
    height: "100%",
    width: "100%",
  },
  sliderStyling: {
    backgroundColor: "orange",
    height: "100%",
    padding: 0,
  },
  backgroundVideo: {
    flex: 1,
  },
  videoContainerStyling: {
    top: 200,
    height: "25%",
    width: "50%",
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 50,
    elevation: 5,
  },
  bubbleContainerStyling: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 30,
    height: 50,
    width: 50,
    zIndex: 1,
  },
  talkingBubbleStyling: {
    backgroundColor: "purple",
    alignItems: "center",
    opacity: 0.3,
    height: "100%",
    width: "100%",
    elevation: 5,
    borderRadius: 120,
    zIndex: 2,
  },
  centerBubbleStyling: {
    position: "absolute",
    top: "25%",
    backgroundColor: "purple",
    opacity: 0.6,
    height: "50%",
    width: "50%",
    borderRadius: 120,
    zIndex: 3,
  },
  // for the blob
  temporalBlobStyling: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  blobStyling: {
    position: "absolute",
    height: 115,
    width: 115,
  },
});

export default styles;
