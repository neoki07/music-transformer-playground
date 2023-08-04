import { Loading } from "../Loading";
import { Keyboard } from "./Keyboard";

interface LoadingSongProps {
  playNote: (noteNumber: number) => void;
  stopNote: (noteNumber: number) => void;
}

export function LoadingSong({ playNote, stopNote }: LoadingSongProps) {
  return (
    <div className="flex flex-col items-center space-y-8">
      <Loading label="Generating..." />
      <div className="text-center text-slate-500 text-lg">
        Generating piano music with AI takes about 1 to 2 minutes.
        <br />
        Enjoy playing the piano while you wait!
      </div>
      <Keyboard playNote={playNote} stopNote={stopNote} />
    </div>
  );
}
