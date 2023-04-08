import { useContext } from "react";
import { AudioContextContext, type AudioContextType } from "../contexts";

export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContextContext);

  if (context === undefined) {
    throw new Error(
      "useAudioContext must be used within an AudioContextProvider."
    );
  }

  return context;
};
