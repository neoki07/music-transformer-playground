import { motion } from "framer-motion";

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="space-y-16">
      <section className="flex flex-col items-center space-y-8">
        <motion.h1
          className="text-8xl font-cal-sans text-center"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 1 }}
          initial="hidden"
          animate="visible"
        >
          Music Transformer
          <br />
          Playground
        </motion.h1>
        <motion.p
          className="text-2xl leading-10 text-center text-slate-500"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 1 }}
          initial="hidden"
          animate="visible"
        >
          A playground to generate piano performances easily
          <br />
          using AI called Music Transformer
        </motion.p>
      </section>
      <section className="flex flex-col items-center">
        <button onClick={onStart}>
          <motion.div
            className="px-8 py-3 bg-black hover:bg-black/80 text-white rounded-lg"
            variants={{
              hidden: { y: 20, opacity: 0, transition: { duration: 1 } },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 1 },
              },
            }}
            whileTap={{ scale: 0.925, transition: { duration: 0.005 } }}
            initial="hidden"
            animate="visible"
          >
            Let's start
          </motion.div>
        </button>
      </section>
    </div>
  );
}
