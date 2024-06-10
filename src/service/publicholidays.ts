import { PublicHolidays } from "../models/PublicHolidays";
import { errorAction } from "../redux/notifcations";
import { publicHolidaysAction } from "../redux/public-holidays";
import { client } from "./client";

export interface LoadPublicHolidaysFunc {
    (): void;
};

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
    console.log(data);

    client.put("/publicholidays", data).
        then((response) => {
            console.log(response)
        }).
        catch((e) => {
            dispatch(errorAction(e.message));
        });
};
