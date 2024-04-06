import { client } from "./client";
import { errorAction } from "../redux/notifcations";
import { options } from "../redux/reports";

export interface LoadReportOptionsFunc {
    (): void;
}

export const loadReportOptions: LoadReportOptionsFunc = () => async (dispatch) => {
    client.get(`/reports/options`)
        .then((response) => {
            dispatch(options(response.data));
        })
        .catch((e) => {
           dispatch(errorAction(e.message));
        });
};
