import { useContext } from "react";
import { AudioContextContext, AudioContextResult } from "./shared";

export function useAudioContext(): AudioContextResult {
  const context = useContext(AudioContextContext);

  if (context === undefined) {
    throw new Error(
      "useAudioContext must be used within an AudioContextProvider."
    );
  }

  return context;
}
