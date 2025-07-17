import { createSlice } from "@reduxjs/toolkit";

export interface IDiamondSlice {
  id: number;
  pos: { x: number; y: number };
}

const randomSpawn = () => {
  const count = Math.floor(Math.random() * 6) + 1;
  return Array.from({ length: count }, (_, idx) => ({
    id: idx,
    pos: {
      x: Math.floor(Math.random() * 7),
      y: Math.floor(Math.random() * 7),
    },
  }));
};

const initialState: IDiamondSlice[] = randomSpawn();

export const diamondsSlice = createSlice({
  name: "diamonds",
  initialState,
  reducers: {
    setPosition(state, action) {
      state[action.payload[1].id].pos = action.payload[0];
    },
    setDiamonds(state, action) {
      state = action.payload;
    },
  },
});

export const { setPosition, setDiamonds } = diamondsSlice.actions;
export default diamondsSlice.reducer;
