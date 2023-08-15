import { configureStore } from "@reduxjs/toolkit";
import timeLogsReducer from "./timelog/timelogs";
import notificationReducer from "./notifcations";



export const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        timeLogs: timeLogsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
