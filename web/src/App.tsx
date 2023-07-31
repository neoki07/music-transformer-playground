import { useCallback, useState } from "react";
import { Landing } from "./Landing";
import { useAudioContext } from "./providers/AudioContextProvider";
import { Playground } from "./features/playground";
import { Layout } from "./components/Layout";

interface AppInnerProps {
  onStart?: () => void;
}

function AppInner({ onStart }: AppInnerProps) {
  const [audioContext, setAudioContext] = useAudioContext();

  const handleStart = useCallback(() => {
    setAudioContext(new AudioContext());
    onStart?.();
  }, [setAudioContext, onStart]);

  return (
    <div className="h-full flex justify-center items-center">
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

export function App() {
  const [showHeader, setShowHeader] = useState(false);

  const handleStart = useCallback(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <Layout showHeader={showHeader}>
      <AppInner onStart={handleStart} />
    </Layout>
  );
}
