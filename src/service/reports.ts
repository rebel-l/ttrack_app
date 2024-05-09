import { client } from "./client";
import { errorAction } from "../redux/notifcations";
import { loadedByYear, options } from "../redux/reports";

export interface LoadReportOptionsFunc {
    (): void;
}

export interface LoadReportFunc {
    (year: number): void;
}

export const loadReportOptions: LoadReportOptionsFunc = () => async (dispatch) => {
    client.get("/reports/options").
        then((response) => {
            dispatch(options(response.data));
        }).
        catch((e) => {
            dispatch(errorAction(e.message));
        });
};

export const loadReport: LoadReportFunc = (year: number) => async (dispatch) => {
    client.get(`/reports/${year}`).
        then((response) => {
            dispatch(loadedByYear(response.data));
        }).
        catch((e) => {
            dispatch(errorAction(e.message));
        });
};
