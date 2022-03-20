import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeLog } from "../../models/TimeLog";
import type { RootState } from "../store";
import { TimeLogs } from "../../models/TimeLogs";
import { save } from "../../service/timelogs";

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
                // state.value = action.payload;   // FIXME: not able to execute this line more than once
                console.log("state", state);

                action.payload.forEach((value: TimeLog) => {
                    save(value)
                        .then((response) => {
                            // let found : boolean = false;
                            //
                            // state.value.forEach((value: TimeLog, index: number) => {
                            //     if(value.ID === response.data.ID) {
                            //         state.value[index] = response.data;
                            //         found = true;
                            //     }
                            // })
                            //
                            // if(!found) {
                            //     state.value.push(response.data);
                            // }
                            console.log("response", response, state.value); // eslint-disable-line no-console
                        }).
                        catch((err) => {
                            alert("saving data failed!"); // eslint-disable-line no-alert
                            console.log(err); // eslint-disable-line no-console
                        });
                });
            },
            saved: (state, action: PayloadAction<TimeLog>) => {
                console.log("saved reducer", state.value, action);

                // state.value.push(action.payload);
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
    { saved, set } = timelogsSlice.actions,
    selectTimeLogs = (state: RootState) => state.timeLogs.value;

export default timelogsSlice.reducer;
