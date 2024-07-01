import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import MakeDirs from "./src/back/DirUtils";
import MovingSmiley from "./src/molecules/MovingSmiley";
import NoPermissionPage from "./src/pages/NoPermissionsPage";
import RequestPermissions from "./src/back/RequestPermissions";
import styles from "./style";
import TalkingBubble from "./src/molecules/TalkingBubble";
import VideoPlayer from "./src/pages/VideoPlayer";
import { SpeakingProvider, DragDropProvider } from "./src/contexts/AppContext";
import RecordAudio from "./src/back/RecordAudio";

export default function App() {
  const success = useRef(RequestPermissions());

  useEffect(() => {
    MakeDirs();
  });

  // return (
  //   <>{success ? <VoiceTest /> : <NoPermissionPage permissionName="Mic" />}</>
  // );

  return (
    <>
      {console.log("Rerendered the whole app.")}
      {success ? (
        <SpeakingProvider>
          <RecordAudio />
          <DragDropProvider>
            <View style={styles.containerStyling}>
              <VideoPlayer />
              <TalkingBubble />
              <MovingSmiley />
            </View>
          </DragDropProvider>
        </SpeakingProvider>
      ) : (
        <NoPermissionPage permissionName={"Mic"} />
      )}
    </>
  );
}
