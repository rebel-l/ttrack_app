import { configureStore } from "@reduxjs/toolkit";
import timelogs from "./timelog/timelogs";
import ErrorState from "./error";

export const store = configureStore({
    reducer: {
        error: ErrorState,
        timeLogs: timelogs,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
