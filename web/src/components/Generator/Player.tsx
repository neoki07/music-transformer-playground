import { PianoRoll, useRecital } from "@resonance-box/react-recital";
import { motion } from "framer-motion";
import { PlayIcon, StopIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGeneratedSong } from "./getGeneratedSong";
import { getMinMaxNoteNumber } from "./getMinMaxNotNumber";

interface PlayerProps {
  apiUrl: string;
}

export function Player({ apiUrl }: PlayerProps) {
  const { play, stop, setSong } = useRecital();
  const {
    data: song,
    remove,
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
    stop();
    remove();
    refetch().catch((e) => {
      throw new Error(e.message);
    });
  }, [stop, remove, refetch]);

  useEffect(() => {
    if (song !== undefined) {
      setSong(song);
    }
  }, [song, setSong]);

  return (
    <div className="space-y-6">
      <div className="h-8" />
      <div className="shadow-lg shadow-black/40">
        <PianoRoll
          width={800}
          height={480}
          minNoteNumber={minNoteNumber}
          maxNoteNumber={maxNoteNumber}
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="space-x-6">
          <button onClick={play}>
            <motion.div
              className="p-3 border border-sky-500 rounded-full text-white bg-sky-500 shadow-lg shadow-black/20"
              tabIndex={-1}
              whileTap={{ scale: 0.85 }}
              transition={{ duration: 0.02 }}
            >
              <PlayIcon width={28} />
            </motion.div>
          </button>
          <button onClick={stop}>
            <motion.div
              className="p-3 border border-red-500 rounded-full text-white bg-red-500 shadow-lg shadow-black/20"
              tabIndex={-1}
              whileTap={{ scale: 0.85 }}
              transition={{ duration: 0.02 }}
            >
              <StopIcon width={28} />
            </motion.div>
          </button>
          <button onClick={regenerate}>
            <motion.div
              className="p-3 border border-slate-200 rounded-full text-slate-400 bg-white shadow-lg shadow-black/20"
              tabIndex={-1}
              whileTap={{ scale: 0.85 }}
              transition={{ duration: 0.02 }}
            >
              <ArrowPathIcon width={28} />
            </motion.div>
          </button>
        </div>
      </div>
    </div>
  );
}
