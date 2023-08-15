import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ErrorState {
    messages: string[]
}

const initialState: ErrorState = {
    messages: []
};

// eslint-disable-next-line one-var
export const
    selectNotifications = (state: RootState) => state.notifications.messages,
    notifications = createSlice({
        name: "notifications",
        initialState,
        reducers: {
            errorAction: (state, action : PayloadAction<string>) => {
                state.messages.push(action.payload);
                return state;
            },
            resetAction: (state) => {
                state.messages = initialState.messages;
                return state;
            },
            successAction: (state, action : PayloadAction<string>) => {
                state.messages.push(action.payload);
                return state;
            },
        },
    }),
    { errorAction, resetAction, successAction } = notifications.actions;

export default notifications.reducer;
