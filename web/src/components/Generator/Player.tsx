import { PianoRoll, useRecital } from "@resonance-box/react-recital";
import { motion } from "framer-motion";
import { PlayIcon, StopIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";

interface PlayerProps {
  regenerate: () => void;
  minNoteNumber: number;
  maxNoteNumber: number;
}

export function Player({
  regenerate,
  minNoteNumber,
  maxNoteNumber,
}: PlayerProps) {
  const { play, stop } = useRecital();

  const stopAndRegenerate = useCallback(() => {
    stop();
    regenerate();
  }, [stop, regenerate]);

  return (
    <div className="space-y-6 -mb-20">
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
          <button onClick={stopAndRegenerate}>
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
      <div className="shadow-lg shadow-black/40">
        <PianoRoll
          width={800}
          height={640}
          minNoteNumber={minNoteNumber}
          maxNoteNumber={maxNoteNumber}
        />
      </div>
    </div>
  );
}
