import { type FC, type ReactNode, useState } from "react";
import { AudioContextContext } from "../contexts";

interface AudioContextProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: FC<AudioContextProviderProps> = ({
  children,
}) => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>(
    undefined
  );

  return (
    <AudioContextContext.Provider value={[audioContext, setAudioContext]}>
      {children}
    </AudioContextContext.Provider>
  );
};
