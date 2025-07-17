import { createSlice } from "@reduxjs/toolkit";

export interface HistorySlice {
  current: number;
  all: {
    originalCommand: string;
    optimizedCommand: string;
    date: string;
    diamond_id: number;
    diamond_pos: {
      before: { x: number; y: number };
      after: { x: number; y: number };
    };
  }[];
}

const initialState: HistorySlice = { current: 0, all: [] };

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    newNote(state, action) {
      state.current = 1;
      state.all.push({
        originalCommand: action.payload.command,
        optimizedCommand: action.payload.compressed,
        date: new Date().toISOString(),
        diamond_id: -1,
        diamond_pos: { before: { x: 0, y: 0 }, after: { x: 0, y: 0 } },
      });
    },
    setCurrentNote(state, action) {
      state.current = action.payload;
    },
    setNote(state, action) {
      state.all[state.current - 1] = action.payload;
    },
    clearNote(state, action) {},
    clearHistory(state, action) {},
  },
});

export const { newNote, setCurrentNote, setNote, clearNote, clearHistory } =
  historySlice.actions;
export default historySlice.reducer;
