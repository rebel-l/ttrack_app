import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ErrorState {
    lastRead: number
    messages: string[]
}

const initialState: ErrorState = {
    lastRead: 0,
    messages: []
};

// eslint-disable-next-line one-var
export const
    selectErrors = (state: RootState) => state.error.messages.slice(state.error.lastRead),
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
