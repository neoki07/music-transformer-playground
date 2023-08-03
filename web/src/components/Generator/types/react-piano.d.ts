declare module "react-piano" {
  import * as React from "react";

  type KeyboardShortcut = {
    key: string;
    midiNumber: number;
  };

  interface PianoProps {
    noteRange: {
      first: number;
      last: number;
    };
    activeNotes?: number[];
    playNote: (midiNumber: number) => void;
    stopNote: (midiNumber: number) => void;
    onPlayNoteInput?: (
      midiNumber: number,
      options: { prevActiveNotes: number[] }
    ) => void;
    onStopNoteInput?: (
      midiNumber: number,
      options: { prevActiveNotes: number[] }
    ) => void;
    renderNoteLabel?: (midiNumber: number) => React.ReactNode;
    className?: string;
    disabled?: boolean;
    width?: number;
    keyWidthToHeight?: number;
    keyboardShortcuts?: KeyboardShortcut[];
  }

  interface PianoState {
    activeNotes: number[];
  }

  class Piano extends React.Component<PianoProps, PianoState> {
    handlePlayNoteInput: (midiNumber: number) => void;
    handleStopNoteInput: (midiNumber: number) => void;
  }

  export interface MidiNumberAttributes {
    note: string;
    pitchName: string;
    octave: number;
    midiNumber: number;
    isAccidental: boolean;
  }

  export interface MidiNumbersModule {
    fromNote: (note: string) => number;
    getAttributes: (midiNumber: number) => MidiNumberAttributes;
    MIN_MIDI_NUMBER: number;
    MAX_MIDI_NUMBER: number;
    NATURAL_MIDI_NUMBERS: number[];
  }

  const MidiNumbers: MidiNumbersModule;

  interface KeyboardShortcut {
    natural: string;
    flat: string;
    sharp: string;
  }

  interface KeyboardShortcutsModule {
    create: (options: {
      firstNote: number;
      lastNote: number;
      keyboardConfig: KeyboardShortcut[];
    }) => {
      key: string;
      midiNumber: number;
    }[];
    BOTTOM_ROW: KeyboardShortcut[];
    HOME_ROW: KeyboardShortcut[];
    QWERTY_ROW: KeyboardShortcut[];
  }

  const KeyboardShortcuts: KeyboardShortcutsModule;

  export { Piano, MidiNumbers, KeyboardShortcuts };
}
