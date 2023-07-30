import { ReactNode, useState } from "react";
import { AudioContextContext } from "./shared";

interface AudioContextProviderProps {
  children: ReactNode;
}

export function AudioContextProvider({ children }: AudioContextProviderProps) {
  const [audioContext, setAudioContext] = useState<AudioContext>();

  return (
    <AudioContextContext.Provider value={[audioContext, setAudioContext]}>
      {children}
    </AudioContextContext.Provider>
  );
}
