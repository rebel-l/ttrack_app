import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TimeLog } from "../../models/TimeLog";
import { TimeLogs } from "../../models/TimeLogs";

interface TimeLogsState {
    value: TimeLogs
}

const initialState: TimeLogsState = { value: [] as TimeLogs };

// eslint-disable-next-line one-var
export const
    selectTimeLogs = (state: RootState) => state.timeLogs.value,
    timeLogsSlice = createSlice({
        name: "timelogs",
        initialState,
        reducers: {
            saved: (state, action: PayloadAction<TimeLog>) => {
                let found = false;

                state.value.forEach((value: TimeLog, index: number) => {
                    if (value.ID === action.payload.ID) {
                        state.value[index] = action.payload;
                        found = true;
                    }
                });

                if (!found) {
                    state.value.push(action.payload);
                }

                return state;
            },
        },
    }),
    { saved } = timeLogsSlice.actions;

export default timeLogsSlice.reducer;
