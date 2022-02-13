import { TimeLog, timeLogIsEqual } from "./TimeLog";

export type TimeLogs = TimeLog[];

export const timeLogsIsEqual = (first: TimeLogs, second: TimeLogs) : boolean => {
    if (first.length !== second.length) {
        return false;
    }

    const max: number = first.length;
    let i = 0;

    for (; i < max; i++) {
        if (!timeLogIsEqual(first[i], second[i])) {
            return false;
        }
    }

    return true;
};
