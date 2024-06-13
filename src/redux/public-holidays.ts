import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MapifyTs from "mapify-ts";
import { PublicHolidays, PublicHolidaysByYear } from "../models/PublicHolidays";
import type { RootState } from "./store";

interface PublicHolidaysState {
    preview: PublicHolidays;
    current: string;
}

export const initialState: PublicHolidaysState = {
    preview: [] as PublicHolidays,
    current: MapifyTs.serialize(new Map<string, PublicHolidays>() as PublicHolidaysByYear),
};

// eslint-disable-next-line one-var
export const
    selectCurrent = (state: RootState) => MapifyTs.deserialize(state.publicHolidays.current),
    publicHolidaysSlice = createSlice({
        name: "publicHolidaysAction",
        initialState,
        reducers: {
            publicHolidaysAction: (state, action: PayloadAction<PublicHolidaysByYear>) => {
                state.current = MapifyTs.serialize(action.payload);
                return state;
            },
            mergeHolidayAction: (state, action: PayloadAction<PublicHolidaysByYear>) => {
                const current = MapifyTs.deserialize(state.current);

                for (const key in action.payload) {
                    current[key] = action.payload[key];
                }

                state.current = MapifyTs.serialize(current);

                return state;
            },
        },
    }),
    { publicHolidaysAction, mergeHolidayAction } = publicHolidaysSlice.actions;

export default publicHolidaysSlice.reducer;
