import { motion } from "framer-motion";

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen font-inter">
      <header className="h-16"></header>

      <main className="max-w-5xl flex-1 flex flex-col justify-center space-y-16">
        <section className="flex flex-col items-center space-y-8">
          <motion.h1
            className="text-8xl font-bold font-cal-sans text-center"
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
          <button onClick={() => {}}>
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
      </main>

      <footer className="h-16 flex justify-center items-center border-t w-full text-slate-700 text-sm">
        <span>
          Built by{" "}
          <a
            className="text-black underline underline-offset-4"
            href="https://github.com/ot07"
            target="_blank"
          >
            ot07
          </a>
          . The source code is available on{" "}
          <a
            className="text-black underline underline-offset-4"
            href="https://github.com/ot07/music-transformer-playground"
            target="_blank"
          >
            GitHub
          </a>
          .
        </span>
      </footer>
    </div>
  );
}

export default App;
