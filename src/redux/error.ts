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
    selectErrors = (state: RootState) => state.error.messages,
    errorSlice = createSlice({
        name: "error",
        initialState,
        reducers: {
            error: (state, action : PayloadAction<string>) => {
                state.messages.push(action.payload);
                return state;
            },
            reset: (state) => {
                state.messages = initialState.messages;
                return state;
            }
        },
    }),
    { error, reset } = errorSlice.actions;

export default errorSlice.reducer;
