import { type FC, type ReactNode, useCallback, useEffect } from "react";
import { useAudioContext } from "../../providers";
import { Button, Center, rem } from "@mantine/core";
import { useRecital, useSoundFont2Synth } from "@resonance-box/react-recital";

interface InnerProps {
  audioContext: AudioContext;
  children: ReactNode;
}

const Inner: FC<InnerProps> = ({ audioContext, children }) => {
  const { setSynth } = useRecital();
  const { synth, initialized } = useSoundFont2Synth(
    new URL("../../assets/GeneralUser GS v1.471.sf2", import.meta.url),
    audioContext
  );

  useEffect(() => {
    if (initialized) {
      setSynth(synth);
    }
  }, [initialized]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

interface MainLayoutProps {
  title: string;
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ title, children }) => {
  const [audioContext, setAudioContext] = useAudioContext();

  const handleStartClick = useCallback(() => {
    const newAudioContext = new AudioContext();
    setAudioContext(newAudioContext);
  }, []);

  return (
    <>
      <main>
        {audioContext !== undefined ? (
          <Inner audioContext={audioContext}>{children}</Inner>
        ) : (
          <Center py={80}>
            <Button
              color="dark"
              radius="md"
              fw={700}
              styles={(theme) => ({
                root: {
                  height: rem(40),
                },
              })}
              onClick={handleStartClick}
            >
              Start
            </Button>
          </Center>
        )}
      </main>
    </>
  );
};
