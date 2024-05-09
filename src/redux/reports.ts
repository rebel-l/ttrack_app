import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { List, Options } from "../models/Reports";

interface ReportsState {
    options: Options
    list: List
}

const initialState: ReportsState = {
    options: [] as Options,
    list: null,
};

// eslint-disable-next-line one-var
export const
    selectOptions = (state: RootState) => state.reports.options,
    selectList = (state: RootState) => state.reports.list,
    reportsSlice = createSlice({
        name: "reports",
        initialState,
        reducers: {
            options: (state, action: PayloadAction<Options>) => {
                state.options = action.payload;

                return state;
            },
            loadedByYear: (state, action: PayloadAction<List>) => {
                state.list = action.payload;

                return state;
            },
        },
    }),
    { loadedByYear, options } = reportsSlice.actions;

export default reportsSlice.reducer;
