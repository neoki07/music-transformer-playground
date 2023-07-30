function App() {
  return (
    <div className="flex flex-col items-center min-h-screen font-inter">
      <header className="h-16"></header>

      <main className="max-w-5xl flex-1 flex flex-col justify-center space-y-24">
        <section className="flex flex-col items-center space-y-8">
          <h1 className="text-8xl font-bold font-cal-sans text-center">
            Music Transformer
            <br />
            Playground
          </h1>
          <p className="text-2xl leading-10 text-center text-slate-500">
            A playground to generate piano performances easily
            <br />
            using AI called Music Transformer
          </p>
        </section>
        <section className="flex flex-col items-center">
          <button className="px-8 py-3 bg-black hover:bg-black/80 text-white rounded-lg">
            Let's start
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
