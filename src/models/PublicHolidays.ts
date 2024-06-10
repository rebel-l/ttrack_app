export type PublicHoliday = {
    ID?: string;
    Date: string;
    Name: string;
    HalfDay: boolean;
}

export type PublicHolidays = PublicHoliday[];

export type PublicHolidaysByYear = Map<string, PublicHolidays>
