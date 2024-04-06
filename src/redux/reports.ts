import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Options } from "../models/Reports";

interface ReportsState {
    options: Options
}

const initialState: ReportsState = { options: [] as Options };

// eslint-disable-next-line one-var
export const
    selectOptions = (state: RootState) => state.reports.options,
    reportsSlice = createSlice({
        name: "reports",
        initialState,
        reducers: {
            options: (state, action: PayloadAction<Options>) => {
                state.options = action.payload;

                return state;
            }
        },
    }),
    { options} = reportsSlice.actions;

export default reportsSlice.reducer;
