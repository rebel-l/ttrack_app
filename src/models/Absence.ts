import { TimeLog } from "./TimeLog";
import { TimeLogs } from "./TimeLogs";

const
    workHourPerWeek: number = 40,
    workDays : number[] = [1, 2, 3, 4, 5],   // Mo - Fr
    workHoursPerDay : number = workHourPerWeek / workDays.length;

export type AbsencePiece = Date | null;

export type Absence = AbsencePiece | [AbsencePiece, AbsencePiece];

export const
    SickLeave: string = "sick leave",
    Vacation: string = "vacation",
    Reasons : readonly string[] = [
        SickLeave,
        Vacation,
    ],
    convertAbsencePieceToTimeLog = (reason: string, value: AbsencePiece) : TimeLog => {
        const start : Date = new Date();
        if (value) {
            start.setDate(value.getDate());
            start.setMonth(value.getMonth());
            start.setFullYear(value.getFullYear());
            start.setHours(9, 0, 0,0 );
        }

        let endTime : number = start.getHours() + workHoursPerDay;
        if (endTime > 24) {
            endTime = 23;
        }

        const end : Date = new Date(start.toISOString());
        end.setHours(endTime);


        return {
            Start: start.toISOString(),
            Stop: end.toISOString(),
            Reason: reason
        } as TimeLog
    },
    convertAbsenceToTimeLogs = (reason: string, range: Absence) : TimeLogs => {
        let result : TimeLogs = [],
            current : AbsencePiece = range[0];

        do {
            if (workDays.includes(current.getDay())) {
                result.push(convertAbsencePieceToTimeLog(reason, current));
            }

            current.setDate(current.getDate() + 1);
        } while (range[1] && current < range[1]);

        return result;
    }
;
