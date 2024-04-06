import { loadedByDateRange, saved } from "../redux/timelogs";
import { errorAction, successAction } from "../redux/notifcations";
import { TimeLog } from "../models/TimeLog";
import { client } from "./client";

export interface SaveFunc {
    (payload: TimeLog, showSuccess?: boolean): void;
}

export interface LoadByDateRangeFunc {
    (start: string, stop: string): void;
}

// eslint-disable-next-line one-var
export const
    save: SaveFunc = (payload: TimeLog, showSuccess: boolean) => async (dispatch) => {
        // eslint-disable-next-line
        try {
            const response = await client.put(`/timgelogs`, payload);

            dispatch(saved(response.data));
            if (showSuccess) {
                dispatch(successAction(response.data.ID));
            }
        } catch (e) {
            dispatch(errorAction(e.message));
        }
    },

    loadByDateRange: LoadByDateRangeFunc = (start: string, stop: string) => async (dispatch) => {
        const response = await client.get(`/timelogs/${start}/${stop}`);

        dispatch(loadedByDateRange(response.data));
    };
