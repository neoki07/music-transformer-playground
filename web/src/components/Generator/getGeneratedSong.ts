import {
  createSongFromMidiArrayBuffer,
  Ticks,
  Song,
  Track,
  Velocity,
} from "@resonance-box/recital-core";

function linearScaleVelocities(track: Track, min: number, max: number) {
  const notes = track.sortedNotes;

  const velocities = notes.map((note) => note.velocity.value);
  const minVelocity = Math.min(...velocities);
  const maxVelocity = Math.max(...velocities);

  notes.forEach((note) => {
    const normalizedVelocity =
      (note.velocity.value - minVelocity) / (maxVelocity - minVelocity);
    const remappedVelocity = min + normalizedVelocity * (max - min);

    console.log({
      velocity: note.velocity.value,
      scaledVelocity: Math.round(remappedVelocity),
    });

    track.updateNote(note.id, {
      velocity: new Velocity(Math.round(remappedVelocity)),
    });
  });
}

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

  linearScaleVelocities(track, 80, 127);

  return song;
}
