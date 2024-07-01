/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from "react";

export const SpeakingContext = createContext({
  agentSpeaking: false,
  end: false,
  userSpeaking: false,
  setAgentSpeaking: (agentSpeaking: boolean) => {},
  setEnd: (end: boolean) => {},
  setUserSpeaking: (userSpesking: boolean) => {},
});

export const DragDropContext = createContext({
  dragDrop: false,
  setDragDrop: (dragDrop: boolean) => {},
});

export function SpeakingProvider({ children }) {
  const [agentSpeaking, setAgentSpeaking] = useState(true);
  const [end, setEnd] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const value = {
    agentSpeaking,
    end,
    userSpeaking,
    setAgentSpeaking,
    setEnd,
    setUserSpeaking,
  };

  return (
    <SpeakingContext.Provider value={value}>
      {children}
    </SpeakingContext.Provider>
  );
}

export function DragDropProvider({ children }) {
  const [dragDrop, setDragDrop] = useState(false);
  const value = { dragDrop, setDragDrop };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
}
