import {
  createSongFromMidiArrayBuffer,
  Ticks,
  Song,
} from "@resonance-box/recital-core";

export async function getGeneratedSong(apiUrl: string): Promise<Song> {
  const response = await fetch(`${apiUrl}/generate/unconditional/from-scratch`);
  const data = await response.arrayBuffer();
  const song = createSongFromMidiArrayBuffer(data, 480);

  const track = song.getTracks()[0];
  const notes = track.sortedNotes;

  const firstNoteTicks = notes[0].ticks.value;
  notes.forEach((note) => {
    track.updateNote(note.id, {
      ticks: new Ticks(note.ticks.value - firstNoteTicks),
    });
  });

  return song;
}
