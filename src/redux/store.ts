import { configureStore } from "@reduxjs/toolkit";
import timelogs from "./timelog/timelogs";

export const store = configureStore({ reducer: { timeLogs: timelogs } });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
