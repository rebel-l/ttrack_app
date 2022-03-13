import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TimeLogs } from "../../models/TimeLogs";

interface TimeLogsState {
    value: TimeLogs
}

const initialState: TimeLogsState = {
    value: [] as TimeLogs
};

// eslint-disable-next-line one-var
export const timelogsSlice = createSlice({
        name: "timelogs",
        initialState,
        reducers: {
            set: (state, action: PayloadAction<TimeLogs>) => {
                console.log("called reducer", state, action); // eslint-disable-line no-console
                state.value = action.payload;   // FIXME: not able to execute this line more than once
            },
        },
    }),
    { set } = timelogsSlice.actions;

export default timelogsSlice.reducer;

