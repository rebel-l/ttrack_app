import axios from "axios";

import { saved } from "../redux/timelog/timelogs";
import { TimeLog } from "../models/TimeLog";

export interface SaveFunc {
    (payload : TimeLog): void
}

export const save : SaveFunc = (payload : TimeLog) => async (dispatch) => {
    // eslint-disable-next-line
    const response = await axios.put("http://localhost:3000/timgelogs", payload); // TODO: create base url dynamic

    dispatch(saved(response.data));
};
