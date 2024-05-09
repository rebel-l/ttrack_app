import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFeiertageResponse } from "../models/ApiFeiertage";
import { PublicHolidays } from "../models/PublicHolidays";
import type { RootState } from "./store";

interface PublicHolidaysState {
    preview: PublicHolidays
}

const initialState: PublicHolidaysState = { preview: [] as PublicHolidays };

// eslint-disable-next-line one-var
export const
    selectPreview = (state: RootState) => state.publicHolidays.preview,
    publicHolidaysSlice = createSlice({
        name: "publicHolidays",
        initialState,
        reducers: {
            apiFeiertageToPublicHolidays: (state, action: PayloadAction<ApiFeiertageResponse>) => {
                state.preview = [] as PublicHolidays;

                let year: number;

                action.payload.feiertage.forEach((feiertag) => {
                    if (feiertag.be === "1") {
                        const date = new Date(feiertag.date);

                        year = date.getFullYear();
                        state.preview.push({
                            Date: date.toISOString(),
                            Name: feiertag.fname,
                            HalfDay: false,
                        });
                    }
                });

                state.preview.push({
                    Date: new Date(Date.UTC(year, 11, 24)).toISOString(),
                    Name: "Heiligabend",
                    HalfDay: true,
                });

                state.preview.push({
                    Date: new Date(Date.UTC(year, 11, 31)).toISOString(),
                    Name: "Silvester",
                    HalfDay: true,
                });

                return state;
            },
        },
    }),
    { apiFeiertageToPublicHolidays } = publicHolidaysSlice.actions;

export default publicHolidaysSlice.reducer;
