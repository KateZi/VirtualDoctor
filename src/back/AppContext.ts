/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

export const AgentSpeaking = createContext({
  agentSpeaking: false,
  end: false,
  setAgentSpeaking: (agentSpeaking: boolean) => {},
  setEnd: (end: boolean) => {},
});

export const DragDrop = createContext({
  dragDrop: false,
  setDragDrop: (dragDrop: boolean) => {},
});
