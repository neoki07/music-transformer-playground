import { UnconditionalGenerate } from "./unconditional-generate";

export default function Page() {
  if (!process.env.API_URL) {
    console.error("Environment variable `API_URL` is undefined");
    return;
  }

  return (
    <div className="max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt32 px-4">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
        Music Transformer Playground
      </h1>
      <UnconditionalGenerate apiUrl={process.env.API_URL} />
    </div>
  );
}
