import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // App
  containerStyling: {
    flex: 1,
    // backgroundColor: 'rgb(235, 234, 233)',
    backgroundColor: "white",
    alignItems: "center",
  },
  // for loading and doing logistcs
  loadingButtonStyling: {
    top: "50%",
    backgroundColor: "purple",
    opacity: 0.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 300,
  },
  // Video
  videoContainerStyling: {
    top: 200,
    height: "25%",
    width: "50%",
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 50,
    elevation: 5,
    position: "relative",
  },
  backgroundVideo: {
    height: "100%",
    width: "100%",
    zIndex: 3,
    position: "absolute",
  },
  avatarImageStyling: {
    height: "100%",
    width: "100%",
    zIndex: 1,
    position: "absolute",
  },
  // voice feedback
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
  // drag and drop blob
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
  transcriptionContainerStyling: {
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  transcriptionStyling: { justifyContent: "center" },
  agentTranscriptionStyling: { fontWeight: "bold", marginBottom: 10 },
  userTranscriptionStyling: { marginBottom: 10 },
  // sliding bar
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
});

export default styles;
