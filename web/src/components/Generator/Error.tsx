import { motion } from "framer-motion";

interface ErrorProps {
  onReset: () => void;
}

export function Error({ onReset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center text-slate-500 text-lg">
        Oops! Something went wrong!
      </div>
      <button onClick={onReset}>
        <motion.div
          className="px-8 py-3 bg-red-500 hover:bg-red-500/80 text-white rounded-lg"
          whileTap={{ scale: 0.9, transition: { duration: 0.02 } }}
        >
          Try again
        </motion.div>
      </button>
    </div>
  );
}
