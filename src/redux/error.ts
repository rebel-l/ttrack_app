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
    selectErrors = (state: RootState) => state.notifications.messages,
    errorSlice = createSlice({
        name: "error",
        initialState,
        reducers: {
            errorAction: (state, action : PayloadAction<string>) => {
                state.messages.push(action.payload);
                return state;
            },
            resetAction: (state) => {
                state.messages = initialState.messages;
                return state;
            }
        },
    }),
    { errorAction, resetAction } = errorSlice.actions;

export default errorSlice.reducer;
