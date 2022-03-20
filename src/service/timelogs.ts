import axios from "axios";

import { TimeLog } from "../models/TimeLog";
import { saved } from "../redux/timelog/timelogs";

export interface SaveFunc {
    (payload : TimeLog): void
}

export const save : SaveFunc = (payload : TimeLog) => async (dispatch) => {
    const response = await axios.put("http://localhost:3000/timgelogs", payload);     // TODO: create base url dynamic
    dispatch(saved(response.data));
};
