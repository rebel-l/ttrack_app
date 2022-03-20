import { TimeLog, timeLogIsEqual } from "./TimeLog";

export type TimeLogs = TimeLog[];

export const
    clone = (source: TimeLogs) : TimeLogs => {
        const dest : TimeLogs = [];

        source.forEach((value: TimeLog) => {
            dest.push({ ...value });
        });

        return dest;
    },
    timeLogsIsEqual = (first: TimeLogs, second: TimeLogs) : boolean => {
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
