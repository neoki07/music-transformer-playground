import { useCallback } from "react";
import { Landing } from "./Landing";
import { useAudioContext } from "./providers/AudioContextProvider";
import { Playground } from "./features/playground";

export function App() {
  const [audioContext, setAudioContext] = useAudioContext();

  const handleStart = useCallback(() => {
    setAudioContext(new AudioContext());
  }, [setAudioContext]);

  return (
    <div className="flex-1 flex justify-center items-center">
      {audioContext === undefined && <Landing onStart={handleStart} />}
      {audioContext !== undefined && (
        <Playground
          apiUrl={import.meta.env.VITE_API_URL}
          audioContext={audioContext}
        />
      )}
    </div>
  );
}
