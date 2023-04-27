import { type Song } from "@resonance-box/recital-core";

export function getMinMaxNoteNumber(song: Song): {
  minNoteNumber: number;
  maxNoteNumber: number;
} {
  let minNoteNumber = 127;
  let maxNoteNumber = 0;

  const tracks = song.getTracks();
  for (const track of tracks) {
    const notes = track.sortedNotes;

    for (const note of notes) {
      const noteNumber = note.noteNumber.value;

      if (noteNumber < minNoteNumber) {
        minNoteNumber = noteNumber;
      }

      if (noteNumber > maxNoteNumber) {
        maxNoteNumber = noteNumber;
      }
    }
  }

  return {
    minNoteNumber,
    maxNoteNumber,
  };
}
