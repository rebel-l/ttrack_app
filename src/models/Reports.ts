export type Options = number[];

export type List = {
    Days: number;
    FirstDay: Date;
    LastDay: Date;
    WorkDays: number;
    Year: number;
    DaysOnWeekend: number;
    PublicHolidays: number;
    PublicHolidaysOnWorkdays: number;
    Warnings: Map<string, string>;
    WorkDaysPerReason: Map<string, number>;
    WorkDaysPerLocation: Map<string, number>;
}
