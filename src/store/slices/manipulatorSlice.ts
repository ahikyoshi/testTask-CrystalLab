import { createSlice } from "@reduxjs/toolkit";
import { IDiamondSlice } from "./diamondsSlice";

export interface ManipulatorSlice {
  currentCommand: string;
  isLoading: boolean;
  transfers: null | IDiamondSlice;
  isMoving: boolean;
  pos: { x: number; y: number };
  newDiamondPos: { x: number; y: number };
  speed: 1 | 2 | 4;
}

const initialState: ManipulatorSlice = {
  currentCommand: "",
  isLoading: false,
  transfers: null,
  isMoving: false,
  pos: { x: 0, y: 0 },
  newDiamondPos: { x: 0, y: 0 },
  speed: 4,
};

export const manipulatorSlice = createSlice({
  name: "manipulator",
  initialState,
  reducers: {
    setPos(state, action) {
      state.pos = action.payload;
    },
    setLoading(state, action) {
      state.transfers = action.payload[0];
      state.isLoading = action.payload[1];
    },
    setCurrentCommand(state, action) {
      state.currentCommand = action.payload;
    },
    setMoving(state, action) {
      state.isMoving = action.payload;
    },
    setSpeed(state, action) {
      state.speed = action.payload;
    },
  },
});

export const { setLoading, setCurrentCommand, setPos, setMoving, setSpeed } =
  manipulatorSlice.actions;
export default manipulatorSlice.reducer;
