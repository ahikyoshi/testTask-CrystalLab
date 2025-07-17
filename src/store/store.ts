import { configureStore } from "@reduxjs/toolkit";
import manipulatorReducer from "./slices/manipulatorSlice";
import diamondReducer from "./slices/diamondsSlice";
import historyReducer from "./slices/historySlice";
import snacksReducer from "./slices/snacksSlice";

export const store = configureStore({
  reducer: {
    manipulator: manipulatorReducer,
    diamonds: diamondReducer,
    history: historyReducer,
    snacks: snacksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
