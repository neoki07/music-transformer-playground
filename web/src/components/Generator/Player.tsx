import { PianoRoll, useRecital } from "@resonance-box/react-recital";
import { StopIcon } from "./StopIcon";
import { PlayIcon } from "./PlayIcon";
import { motion } from "framer-motion";

interface PlayerProps {
  generating: boolean;
  minNoteNumber: number;
  maxNoteNumber: number;
}

export function Player({
  generating,
  minNoteNumber,
  maxNoteNumber,
}: PlayerProps) {
  const { play, stop } = useRecital();

  return (
    <motion.div
      className="w-[56rem] space-y-4"
      variants={{
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
      transition={{ duration: 1 }}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-5xl font-cal-sans text-center -mt-32 mb-12">
        Music Transformer
        <br />
        Playground
      </h1>

      <div className="flex items-center justify-center">
        <div className="space-x-8">
          <button disabled={generating} onClick={play}>
            <motion.div
              className="p-3 border border-slate-200 rounded-full bg-sky-500 text-white"
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.02 }}
            >
              <PlayIcon size={32} />
            </motion.div>
          </button>
          <button disabled={generating} onClick={stop}>
            <motion.div
              className="p-3 border border-slate-200 rounded-full bg-red-500 text-white"
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.02 }}
            >
              <StopIcon size={32} />
            </motion.div>
          </button>
        </div>
      </div>
      <PianoRoll
        height={600}
        minNoteNumber={minNoteNumber}
        maxNoteNumber={maxNoteNumber}
      />
    </motion.div>
  );
}
