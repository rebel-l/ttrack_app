import axios, { AxiosInstance } from "axios";
import { errorAction } from "../redux/notifcations";
import { apiFeiertageToPublicHolidays } from "../redux/public-holidays";


const client: AxiosInstance = axios.create({ baseURL: "https://get.api-feiertage.de" });

export interface LoadPublicHolidaysFunc {
    (year: number): void;
}

export const loadPublicHolidays: LoadPublicHolidaysFunc = (year: number) => async (dispatch) => {
    client.get(`?years=${year}&states=be`).
        then((response) => {
        // Console.log(response.data)
            dispatch(apiFeiertageToPublicHolidays(response.data));
        }).
        catch((e) => {
            dispatch(errorAction(e.message));
        });
};
