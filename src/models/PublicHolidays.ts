export type PublicHoliday = {
    ID?: string;
    Day: string;
    Name: string;
    HalfDay: boolean;
    CreatedAt?: Date;
    ModifiedAt?: Date;
}

export type PublicHolidays = PublicHoliday[];

export type PublicHolidaysByYear = Map<string, PublicHolidays>
