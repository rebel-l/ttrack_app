import axios from "axios";

import { loadedByDateRange, saved } from "../redux/timelog/timelogs";
import { errorAction } from "../redux/error";
import { TimeLog } from "../models/TimeLog";

export interface SaveFunc {
    (payload: TimeLog): void;
}

export interface LoadByDateRangeFunc {
    (start: string, stop: string): void;
}

// TODO: create base url dynamic
const client = axios.create({
    // baseURL: "http://localhost:3000", // development
    baseURL: "/api" // production
});

// eslint-disable-next-line one-var
export const
    save: SaveFunc = (payload: TimeLog) => async (dispatch) => {
        // eslint-disable-next-line
        try {
            const response = await client.put(`/timgelogs`, payload);

            dispatch(saved(response.data));
        } catch (e) {
            dispatch(errorAction(e.message));
        }
    },

    loadByDateRange: LoadByDateRangeFunc = (start: string, stop: string) => async (dispatch) => {
        const response = await client.get(`/timelogs/${start}/${stop}`);

        dispatch(loadedByDateRange(response.data));
    };
