import { loadedByDateRange, saved } from "../redux/timelogs";
import { errorAction, successAction } from "../redux/notifcations";
import { TimeLog } from "../models/TimeLog";
import { client } from "./client";

export interface SaveFunc {
    (payload: TimeLog, showSuccess?: boolean): void;
}

export interface DeleteFunc {
    (id: string, start: string, stop: string): void;
}

export interface LoadByDateRangeFunc {
    (start: string, stop: string): void;
}

// eslint-disable-next-line one-var
export const
    save: SaveFunc = (payload: TimeLog, showSuccess: boolean) => async (dispatch) => {
        client.put("/timgelogs", payload).
            then((response) => {
                dispatch(saved(response.data));
                if (showSuccess) {
                    dispatch(successAction(response.data.ID));
                }
            }).
            catch((e) => {
                dispatch(errorAction(e.message));
            });
    },

    loadByDateRange: LoadByDateRangeFunc = (start: string, stop: string) => async (dispatch) => {
        console.log("LOAD");
        client.get(`/timelogs/${start}/${stop}`).
        then((response) => {
            dispatch(loadedByDateRange(response.data));
        }).
        catch((e) => {
            dispatch(errorAction(e.message));
        });
    },

    del: DeleteFunc = (id: string, start: string, stop: string) => async (dispatch) => {
        client.delete(`/timgelogs/${id}`).
        then(() => {
            client.get(`/timelogs/${start}/${stop}`).
            then((response) => {
                dispatch(loadedByDateRange(response.data));
            });
        }).
        catch((e) => {
            dispatch(errorAction(e.message));
        });
    };
