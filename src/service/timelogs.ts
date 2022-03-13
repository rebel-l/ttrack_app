import axios from "axios";

import { TimeLog } from "../models/TimeLog";
import { TimeLogs } from "../models/TimeLogs";

export const save = (payload : TimeLogs) : void => {
    // eslint-disable-next-line
    // TODO: move to redux
    payload.forEach((value: TimeLog) => {
        console.log("execute request"); // eslint-disable-line no-console

        return;

        axios.put("http://localhost:3000/timgelogs", value).
            then((response) => {
                console.log(response); // eslint-disable-line no-console
            }).
            catch((err) => {
                alert("saving data failed!"); // eslint-disable-line no-alert
                console.log(err); // eslint-disable-line no-console
            });
    });
};
