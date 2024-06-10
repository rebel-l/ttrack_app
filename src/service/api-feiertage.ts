import axios, { AxiosInstance } from "axios";
import { errorAction } from "../redux/notifcations";
import { apiFeiertageToPublicHolidaysAction } from "../redux/api-feiertage";


const client: AxiosInstance = axios.create({ baseURL: "https://get.api-feiertage.de" });

export interface LoadApiFeiertageFunc {
    (year: number): void;
}

export const loadApiFeiertage: LoadApiFeiertageFunc = (year: number) => async (dispatch) => {
    client.get(`?years=${year}&states=be`).
        then((response) => {
            dispatch(apiFeiertageToPublicHolidaysAction(response.data));
        }).
        catch((e) => {
            dispatch(errorAction(e.message));
        });
};
