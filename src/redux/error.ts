import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ErrorState {
    message: string
}

const initialState: ErrorState = { message: "" };

// eslint-disable-next-line one-var
export const
    selectError = (state: RootState) => state.error,
    errorSlice = createSlice({
        name: "error",
        initialState,
        reducers: {
            error: (state, action : PayloadAction<string>) => {
                state.message = action.payload;

                return state;
            },
        },
    }),
    { error } = errorSlice.actions;

export default errorSlice.reducer;