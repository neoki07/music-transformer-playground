import { useQuery } from "@tanstack/react-query";
import { getGeneratedSong } from "./getGeneratedSong";
import { Loading } from "../Loading";
import { useEffect, useMemo } from "react";
import { getMinMaxNoteNumber } from "./getMinMaxNotNumber";
import { useRecital } from "@resonance-box/react-recital";
import { Player } from "./Player";

interface GeneratorProps {
  apiUrl: string;
}

export function Generator({ apiUrl }: GeneratorProps) {
  const { setSong } = useRecital();

  const {
    data: song,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["generatedSong"],
    queryFn: async () => await getGeneratedSong(apiUrl),
  });

  const { minNoteNumber, maxNoteNumber } = useMemo(() => {
    if (song === undefined) {
      return { minNoteNumber: 0, maxNoteNumber: 127 };
    }

    const { minNoteNumber, maxNoteNumber } = getMinMaxNoteNumber(song);
    return {
      minNoteNumber: Math.max(0, minNoteNumber - 3),
      maxNoteNumber: Math.min(127, maxNoteNumber + 3),
    };
  }, [song]);

  const regenerate = () => {
    refetch().catch((e) => {
      throw new Error(e.message);
    });
  };

  useEffect(() => {
    if (song !== undefined) {
      setSong(song);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);

  return (
    <div>
      {isFetching ? (
        <Loading label="Generating..." />
      ) : (
        <Player
          generating={isFetching}
          minNoteNumber={minNoteNumber}
          maxNoteNumber={maxNoteNumber}
        />
      )}
    </div>
  );
}
