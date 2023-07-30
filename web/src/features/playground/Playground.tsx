import { useEffect } from "react";
import { useRecital, useSoundFont2Synth } from "@resonance-box/react-recital";
import { Loading } from "../../components/Loading";
import { Generator } from "../../components/Generator";

interface PlaygroundProps {
  apiUrl: string;
  audioContext: AudioContext;
}

export function Playground({ apiUrl, audioContext }: PlaygroundProps) {
  const { setSynth } = useRecital();
  const { synth, initialized } = useSoundFont2Synth(
    new URL("../../assets/sf2/GeneralUser GS v1.471.sf2", import.meta.url),
    audioContext
  );

  useEffect(() => {
    if (initialized) {
      setSynth(synth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  if (!initialized) {
    return <Loading label="Setup instrument..." />;
  }

  return <Generator apiUrl={apiUrl} />;
}
