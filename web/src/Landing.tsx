import { motion } from "framer-motion";

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  return (
    <motion.div
      className="space-y-16 text-center"
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
      transition={{ duration: 1 }}
      initial="hidden"
      animate="visible"
    >
      <section className="space-y-8">
        <h1 className="text-8xl font-cal-sans">
          Music Transformer
          <br />
          Playground
        </h1>
        <p className="text-2xl leading-10 text-slate-500">
          A playground to generate piano performances easily
          <br />
          using AI called Music Transformer
        </p>
      </section>
      <section>
        <button onClick={onStart}>
          <motion.div
            className="px-8 py-3 bg-black hover:bg-black/80 text-white rounded-lg"
            whileTap={{ scale: 0.9, transition: { duration: 0.02 } }}
          >
            Let's start
          </motion.div>
        </button>
      </section>
    </motion.div>
  );
}
