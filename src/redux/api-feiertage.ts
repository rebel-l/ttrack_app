import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFeiertageResponse } from "../models/ApiFeiertage";
import { PublicHolidays } from "../models/PublicHolidays";
import type { RootState } from "./store";
import { initialState } from "./public-holidays";


// eslint-disable-next-line one-var
export const
    selectPreview = (state: RootState) => state.apiFeiertage.preview,
    apiFeiertageSlice = createSlice({
        name: "apiFeiertage",
        initialState,
        reducers: {
            apiFeiertageToPublicHolidaysAction: (state, action: PayloadAction<ApiFeiertageResponse>) => {
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
    { apiFeiertageToPublicHolidaysAction } = apiFeiertageSlice.actions;

export default apiFeiertageSlice.reducer;
