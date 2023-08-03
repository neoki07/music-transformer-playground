import { useQuery } from "@tanstack/react-query";
import { getGeneratedSong } from "./getGeneratedSong";
import { Loading } from "../Loading";
import { useCallback, useEffect, useMemo } from "react";
import { getMinMaxNoteNumber } from "./getMinMaxNotNumber";
import { useRecital } from "@resonance-box/react-recital";
import {
  NoteNumber,
  Seconds,
  Synth,
  Velocity,
} from "@resonance-box/recital-core";
import { Keyboard } from "./Keyboard";
import { Player } from "./Player";

interface GeneratorProps {
  apiUrl: string;
  synth: Synth;
}

export function Generator({ apiUrl, synth }: GeneratorProps) {
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

  const regenerate = useCallback(() => {
    refetch().catch((e) => {
      throw new Error(e.message);
    });
  }, [refetch]);

  const playNote = useCallback(
    (noteNumber: number) => {
      synth.noteOn(
        new NoteNumber(noteNumber),
        new Velocity(100),
        new Seconds(0)
      );
    },
    [synth]
  );

  const stopNote = useCallback(
    (noteNumber: number) => {
      synth.noteOff(new NoteNumber(noteNumber), new Seconds(0));
    },
    [synth]
  );

  useEffect(() => {
    if (song !== undefined) {
      setSong(song);
    }
  }, [song, setSong]);

  return (
    <div>
      {isFetching ? (
        <div className="flex flex-col items-center space-y-8">
          <Loading label="Generating..." />
          <div className="text-center text-slate-500 text-lg">
            Generating piano music with AI takes about 1 to 2 minutes.
            <br />
            Enjoy playing the piano while you wait!
          </div>
          <Keyboard playNote={playNote} stopNote={stopNote} />
        </div>
      ) : (
        <Player
          regenerate={regenerate}
          minNoteNumber={minNoteNumber}
          maxNoteNumber={maxNoteNumber}
        />
      )}
    </div>
  );
}
