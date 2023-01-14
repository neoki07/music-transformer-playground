"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Player, Visualizer } from "@magenta/music";
import { FC, useEffect, useRef, useState } from "react";

import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";

const player = new Player();

type Props = {
  apiUrl: string;
};

async function getGeneratedNoteSeq(apiUrl: string) {
  return axios
    .get(`${apiUrl}/generate/unconditional/from-scratch`)
    .then((response) => response.data);
}

export const UnconditionalGenerate: FC<Props> = ({ apiUrl }) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["generatedNoteSeq"],
    queryFn: () => getGeneratedNoteSeq(apiUrl),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setVisualizer] = useState<Visualizer>();

  useEffect(() => {
    if (data !== undefined) {
      setVisualizer(new Visualizer(data as any, canvasRef.current!));
    }
  }, [data]);

  const generate = () => {
    refetch();
  };

  const play = () => {
    player.start(data as any);
  };

  const stop = () => {
    player.stop();
  };

  return (
    <>
      <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
        <button
          className="bg-slate-900 hover:bg-slate-700 disabled:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto"
          onClick={generate}
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
      {!isFetching && data !== undefined && (
        <>
          <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
            <button
              className="bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto"
              onClick={play}
            >
              Play
            </button>
            <button
              className="bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto"
              onClick={stop}
            >
              Stop
            </button>
          </div>
          <div className="mt-6 sm:mt-10 border border-gray-300 rounded-xl overflow-scroll">
            <canvas ref={canvasRef} />
          </div>
        </>
      )}
    </>
  );
};
