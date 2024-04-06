import { configureStore } from "@reduxjs/toolkit";
import timeLogsReducer from "./timelogs";
import notificationReducer from "./notifcations";
import reportsReducer from "./reports";



export const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        timeLogs: timeLogsReducer,
        reports: reportsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
