import axios from "axios";

import { TimeLog } from "../models/TimeLog";
import { TimeLogs } from "../models/TimeLogs";

export const save = (payload : TimeLogs) : void => {
    // TODO: move to redux
    payload.forEach((value: TimeLog) => {
        axios.put("http://localhost:3000/timgelogs", value)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                alert("saving data failed!");
                console.log(err);
            });
    });
};
