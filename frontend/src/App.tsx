import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";

async function getGeneratedNoteSeq() {
  if (!import.meta.env.VITE_API_URL) {
    console.error("API_URL is undefined");
    return;
  }

  return axios
    .get(`${import.meta.env.VITE_API_URL}/generate/unconditional/from-scratch`)
    .then((response) => response.data);
}

function App() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["generatedNoteSeq"],
    queryFn: getGeneratedNoteSeq,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  console.log("data:", data);

  const handleClick = () => {
    refetch();
  };

  return (
    <div className="max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt32">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
        Music Transformer Playground
      </h1>
      <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
        <button
          className="bg-slate-900 hover:bg-slate-700 disabled:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto"
          onClick={handleClick}
          disabled={isFetching}
        >
          {isFetching ? (
            <>
              <LoadingSpinner />
              Generating...
            </>
          ) : (
            "Unconditional Generate"
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
