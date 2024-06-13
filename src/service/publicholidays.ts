import { PublicHolidays } from "../models/PublicHolidays";
import { errorAction } from "../redux/notifcations";
import { mergeHolidayAction, publicHolidaysAction } from "../redux/public-holidays";
import { client } from "./client";

export interface LoadPublicHolidaysFunc {
    (): void;
}

export interface SavePublicHolidaysFunc {
    (data: PublicHolidays): void;
}


export const loadPublicHolidays: LoadPublicHolidaysFunc = () => async (dispatch) => {
    client.get("/publicholidays").
        then((response) => {
            dispatch(publicHolidaysAction(response.data));
        }).
        catch((e) => {
            dispatch(errorAction(e.message));
        });
};

export const savePublicHolidays: SavePublicHolidaysFunc = (data: PublicHolidays) => async (dispatch) => {
    client.put("/publicholidays", data).
        then((response) => {
            dispatch(mergeHolidayAction(response.data));
        }).
        catch((e) => {
            dispatch(errorAction(e.message));
        });
};
