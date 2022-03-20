import axios, { AxiosResponse } from "axios";

import { TimeLog } from "../models/TimeLog";
import { TimeLogs } from "../models/TimeLogs";
import { saved } from "../redux/timelog/timelogs";

export const save = async (payload : TimeLog) : Promise<AxiosResponse> => {
    const res = await axios.put("http://localhost:3000/timgelogs", payload);    // TODO: create base url dynamic
    return res;
};

export const saveThunk = (payload : TimeLog) => async (dispatch) => {
    const response = await axios.put("http://localhost:3000/timgelogs", payload);     // TODO: create base url dynamic
    dispatch(saved(response.data));
};
