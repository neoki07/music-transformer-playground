import { createContext } from "react";

export type AudioContextType = [
  AudioContext | undefined,
  (audioContext: AudioContext) => void
];

export const AudioContextContext = createContext<AudioContextType | undefined>(
  undefined
);
