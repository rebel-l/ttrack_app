import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeLog } from "../../models/TimeLog";
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
            saved: (state, action: PayloadAction<TimeLog>) => {
                let found : boolean = false;

                state.value.forEach((value: TimeLog, index: number) => {
                    if(value.ID === action.payload.ID) {
                        state.value[index] = action.payload;
                        found = true;
                    }
                })

                if(!found) {
                    state.value.push(action.payload);
                }

                return state
            }
        },
    }),
    { saved } = timelogsSlice.actions,
    selectTimeLogs = (state: RootState) => state.timeLogs.value;

export default timelogsSlice.reducer;
