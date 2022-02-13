export type TimeLog = {
    ID?: string;
    Start: Date;
    Stop?: Date;
    Reason: string;
    Location: string;
    CreatedAt?: Date;
    ModifiedAt?: Date;
};

export const timeLogIsEqual = (first: TimeLog, second: TimeLog) : boolean => {
    if (first.ID !== second.ID || first.Reason !== second.Reason || first.Location !== second.Location) {
        return false;
    }

    if (first.Start.toTimeString() !== second.Start.toTimeString()) {
        return false;
    }

    /* eslint-disable no-mixed-operators */
    return !(typeof first.Stop === "undefined" && typeof first.Stop !== "undefined" ||
            typeof first.Stop !== "undefined" && typeof first.Stop === "undefined" ||
            typeof first.Stop !== "undefined" && typeof first.Stop !== "undefined" &&
            first.Stop.toTimeString() !== second.Start.toTimeString());
};

