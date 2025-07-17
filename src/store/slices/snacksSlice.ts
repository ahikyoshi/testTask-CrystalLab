import { createSlice } from "@reduxjs/toolkit";

export interface ISnacksSlice {
  id: number;
  status: "success" | "error";
  message: string;
}

const initialState: ISnacksSlice[] = [];

export const snacksSlice = createSlice({
  name: "snacks",
  initialState,
  reducers: {
    setSnack(state, action) {
      state.push(action.payload);
    },
    deleteSnack(state, action) {
      return state.filter((snack) => snack.id !== action.payload);
    },
  },
});

export const { setSnack, deleteSnack } = snacksSlice.actions;
export default snacksSlice.reducer;
