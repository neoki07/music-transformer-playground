import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "./styles/react-piano.css";

interface KeyboardProps {
  playNote: (noteNumber: number) => void;
  stopNote: (noteNumber: number) => void;
}

export function Keyboard({ playNote, stopNote }: KeyboardProps) {
  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("f5");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={playNote}
      stopNote={stopNote}
      width={800}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
}
