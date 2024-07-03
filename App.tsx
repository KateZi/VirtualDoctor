import React, { useState } from "react";
import { View } from "react-native";
import MovingSmiley from "./src/molecules/MovingSmiley";
import styles from "./style";
import TalkingBubble from "./src/molecules/TalkingBubble";
import VideoPlayer from "./src/pages/VideoPlayer";
import { SpeakingProvider, DragDropProvider } from "./src/contexts/AppContext";
import TranscriptionPage from "./src/pages/TranscriptionsPage";
import LoadingPage from "./src/pages/LoadingPage";

export default function App() {
  const [init, setInit] = useState(false);

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
