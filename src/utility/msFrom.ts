export enum TimeUnit {
    second, minute, hour, day
}

const DAYS_TO_HOURS = 24
const MINUTES_TO_SECONDS = 60
const HOURS_TO_MINUTES = 60

const SECONDS_TO_MS = 1000
const MINUTES_TO_MS = MINUTES_TO_SECONDS * SECONDS_TO_MS
const HOURS_TO_MS = HOURS_TO_MINUTES * MINUTES_TO_MS
const DAYS_TO_MS = DAYS_TO_HOURS * HOURS_TO_MS

const msFrom = (multiple: number, unit: TimeUnit) => {
    let unitValue: number
    switch (unit) {
        case TimeUnit.day:
            unitValue = DAYS_TO_MS
            break
        case TimeUnit.hour:
            unitValue = HOURS_TO_MS
            break
        case TimeUnit.minute:
            unitValue = MINUTES_TO_MS
            break
        case TimeUnit.second:
            unitValue = SECONDS_TO_MS
            break
        default:
            throw new Error(`Unexpected unit ${unit}`)
    }
    return multiple * unitValue
}

export default msFrom
