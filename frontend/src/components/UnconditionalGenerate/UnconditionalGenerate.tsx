import { Button, Center, Group, Loader, rem } from "@mantine/core";
import {
  PianoRoll,
  RecitalProvider,
  useRecital,
  useSoundFont2Synth,
} from "@resonance-box/react-recital";
import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { type FC, useLayoutEffect, useState } from "react";
import {
  createSongFromMidiArrayBuffer,
  type Song,
} from "@resonance-box/recital-core";

async function getGeneratedSong(apiUrl: string): Promise<Song> {
  const response = await fetch(`${apiUrl}/generate/unconditional/from-scratch`);
  const data = await response.arrayBuffer();
  return createSongFromMidiArrayBuffer(data);
}

interface GenerateButtonProps {
  isGenerating: boolean;
  generate: () => void;
}

const GenerateButton: FC<GenerateButtonProps> = ({
  isGenerating,
  generate,
}) => {
  return (
    <Center>
      <Button
        color="dark"
        radius="md"
        fw={700}
        disabled={isGenerating}
        leftIcon={isGenerating ? <Loader color="gray" size="xs" /> : undefined}
        styles={(theme) => ({
          root: {
            height: rem(40),
          },
        })}
        onClick={generate}
      >
        {isGenerating ? "Generating..." : "Generate"}
      </Button>
    </Center>
  );
};

interface InnerPlayerProps {
  song: Song | undefined;
  isGenerating: boolean;
}

const InnerPlayer: FC<InnerPlayerProps> = ({ song, isGenerating }) => {
  const { start, stop, setSong } = useRecital();

  useLayoutEffect(() => {
    if (song !== undefined) {
      setSong(song);
    }
  }, [song]);

  return (
    <Group position="center">
      <Button
        radius="md"
        fw={700}
        leftIcon={<IconPlayerPlayFilled size="1rem" />}
        disabled={isGenerating}
        styles={(theme) => ({
          root: {
            height: rem(40),
          },
        })}
        onClick={start}
      >
        PLAY
      </Button>
      <Button
        color="red"
        radius="md"
        fw={700}
        leftIcon={<IconPlayerStopFilled size="1rem" />}
        disabled={isGenerating}
        styles={(theme) => ({
          root: {
            height: rem(40),
          },
        })}
        onClick={stop}
      >
        STOP
      </Button>
    </Group>
  );
};

interface PlayerProps {
  song: Song | undefined;
  isGenerating: boolean;
}

const Player: FC<PlayerProps> = ({ song, isGenerating }) => {
  const { synth } = useSoundFont2Synth(
    new URL("../../assets/GeneralUser GS v1.471.sf2", import.meta.url)
  );

  return (
    <RecitalProvider initialConfig={{ synth, song }}>
      <InnerPlayer isGenerating={isGenerating} song={song} />
      <PianoRoll height={600} />
    </RecitalProvider>
  );
};

interface UnconditionalGenerateProps {
  apiUrl: string;
}

export const UnconditionalGenerate: FC<UnconditionalGenerateProps> = ({
  apiUrl,
}) => {
  const [isClickedGenerateButton, setIsClickedGenerateButton] = useState(false);
  const {
    data: song,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["generatedSong"],
    queryFn: async () => await getGeneratedSong(apiUrl),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const generate = (): void => {
    refetch();
    !isClickedGenerateButton && setIsClickedGenerateButton(true);
  };

  return (
    <>
      <GenerateButton isGenerating={isFetching} generate={generate} />
      {isClickedGenerateButton && (
        <Player song={song} isGenerating={isFetching} />
      )}
    </>
  );
};
