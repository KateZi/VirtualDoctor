import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import MakeDirs from "./src/back/DirUtils";
import MovingSmiley from "./src/molecules/MovingSmiley";
import NoPermissionPage from "./src/pages/NoPermissionsPage";
import RequestPermissions from "./src/back/RequestPermissions";
import styles from "./style";
import TalkingBubble from "./src/molecules/TalkingBubble";
import VideoPlayer from "./src/pages/VideoPlayer";
import { AgentSpeaking, DragDrop } from "./src/back/AppContext";

export default function App() {
  const success = useRef(RequestPermissions());
  const [agentSpeaking, setAgentSpeaking] = useState(true);
  const [end, setEnd] = useState(false);
  const valueAgent = { agentSpeaking, end, setAgentSpeaking, setEnd };
  const [dragDrop, setDragDrop] = useState(false);
  const valueDragDrop = { dragDrop, setDragDrop };

  useEffect(() => {
    MakeDirs();
  });

  // return (
  //   <>{success ? <VoiceTest /> : <NoPermissionPage permissionName="Mic" />}</>
  // );

  return (
    <>
      {success ? (
        <AgentSpeaking.Provider value={valueAgent}>
          <DragDrop.Provider value={valueDragDrop}>
            <View style={styles.containerStyling}>
              <VideoPlayer />
              <TalkingBubble />
              <MovingSmiley />
            </View>
          </DragDrop.Provider>
        </AgentSpeaking.Provider>
      ) : (
        <NoPermissionPage permissionName={"Mic"} />
      )}
    </>
  );
}
