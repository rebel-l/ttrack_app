import axios from "axios";

import { loadedByDateRange, saved } from "../redux/timelog/timelogs";
import { TimeLog } from "../models/TimeLog";

// TODO: create base url dynamic
const client = axios.create({
    // baseURL: "http://localhost:3000", // development
    baseURL: "/api" // production
});

export interface SaveFunc {
    (payload: TimeLog): void;
}

export interface LoadByDateRangeFunc {
    (start: string, stop: string): void;
}

export const save: SaveFunc = (payload: TimeLog) => async (dispatch) => {
    // eslint-disable-next-line
    const response = await client.put(`/timgelogs`, payload);

    dispatch(saved(response.data));
};

export const loadByDateRange: LoadByDateRangeFunc = (start: string, stop: string) => async (dispatch) => {
    const response = await client.get(`/timelogs/${start}/${stop}`);
    dispatch(loadedByDateRange(response.data));
};
