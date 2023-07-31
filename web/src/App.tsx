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
    console.log("onStart1");
    onStart?.();
  }, [setAudioContext, onStart]);

  return (
    <div className="h-screen overflow-hidden flex justify-center items-center">
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
  console.log("showHeader:", showHeader);

  const handleStart = useCallback(() => {
    console.log("onStart2");
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <Layout showHeader={showHeader}>
      <AppInner onStart={handleStart} />
    </Layout>
  );
}
