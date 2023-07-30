import { createContext } from "react";

export type AudioContextResult = [
  AudioContext | undefined,
  (audioContext: AudioContext) => void
];

export const AudioContextContext = createContext<
  AudioContextResult | undefined
>(undefined);
