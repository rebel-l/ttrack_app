import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const error: string = "danger",
    success: string = "success";

export interface Notification {
    message: string
    type: string
}

const initialState: Notification[] = [];

// eslint-disable-next-line one-var
export const
    selectNotifications = (state: RootState) => state.notifications,
    notifications = createSlice({
        name: "notifications",
        initialState,
        reducers: {
            errorAction: (state, action : PayloadAction<string>) => {
                state.push({
                    message: action.payload,
                    type: error
                });
                return state;
            },
            resetAction: (state) => {
                state = initialState;
                return state;
            },
            successAction: (state, action : PayloadAction<string>) => {
                state.push({
                    message: action.payload,
                    type: success
                });
                return state;
            },
        },
    }),
    { errorAction, resetAction, successAction } = notifications.actions;

export default notifications.reducer;
