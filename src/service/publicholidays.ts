import { errorAction } from "../redux/notifcations";
import { publicHolidaysAction } from "../redux/public-holidays";
import { client } from "./client";

export interface LoadPublicHolidaysFunc {
    (): void;
};


export const loadPublicHolidays: LoadPublicHolidaysFunc = () => async (dispatch) => {
    client.get("/publicholidays").
        then((response) => {
            dispatch(publicHolidaysAction(response.data));
        }).
        catch((e) => {
            dispatch(errorAction(e.message));
        });
};
