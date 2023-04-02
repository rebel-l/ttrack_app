export const
    // eslint-disable-next-line no-extra-parens
    sqlDate = (date : Date): string => (
        // eslint-disable-next-line max-len,  no-magic-numbers, newline-per-chained-call
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
    ),

    Day = 1000 * 60 * 60 * 24; // eslint-disable-line  no-magic-numbers
