import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import MovingSmiley from "./src/molecules/MovingSmiley";
import styles from "./style";
import TalkingBubble from "./src/molecules/TalkingBubble";
import VideoPlayer from "./src/pages/VideoPlayer";
import {
  SpeakingProvider,
  DragDropProvider,
  SpeakingContext,
} from "./src/contexts/AppContext";
import TranscriptionPage from "./src/pages/TranscriptionsPage";
import LoadingPage from "./src/pages/LoadingPage";
import { StopSensors } from "./src/back/SensorsUtils";

export default function App() {
  const [init, setInit] = useState(false);
  const { end } = useContext(SpeakingContext);

  useEffect(() => {
    if (end) {
      StopSensors();
    }
  }, [end]);

  return (
    <>
      {console.log("Rerendered the whole app.")}
      {!init ? (
        <LoadingPage setInit={setInit} />
      ) : (
        <SpeakingProvider>
          <TranscriptionPage />
          <DragDropProvider>
            <View style={styles.containerStyling}>
              <VideoPlayer />
              <TalkingBubble />
              <MovingSmiley />
            </View>
          </DragDropProvider>
        </SpeakingProvider>
      )}
    </>
  );
}
