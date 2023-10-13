export enum PERIOD {
    DAILY,
    WEEKLY,
    MONTHLY,
    QUARTERLY,
    ANNUALLY
}

export function periodToUnit(p: PERIOD): string {
    let unit
    switch (p) {
        case PERIOD.ANNUALLY:
            unit = "Year";
            break;
        case PERIOD.QUARTERLY:
            unit = "Quarter";
            break;
        case PERIOD.MONTHLY:
            unit = "Month";
            break;
        case PERIOD.WEEKLY:
            unit = "Week";
            break;
        case PERIOD.DAILY:
            unit = "Day";
            break;
        default:
            unit = "Unknown unit"
    }
    return unit
}

export function periodToDays(p: PERIOD): number {
    let days
    switch (p) {
        case PERIOD.ANNUALLY:
            days = 365;
            break;
        case PERIOD.QUARTERLY:
            days = 365 / 4;
            break;
        case PERIOD.MONTHLY:
            days = 365 / 12;
            break;
        case PERIOD.WEEKLY:
            days = 7;
            break;
        case PERIOD.DAILY:
            days = 1;
            break;
    }
    return days
}

export const formatCurrency = (value: number) => {
    return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};

export const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
};