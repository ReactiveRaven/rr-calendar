import IRange from './range/IRange'

const HOURS_IN_DAY = 24
const MINUTES_IN_HOUR = 60
const SECONDS_IN_MINUTE = 60
const MILLISECONDS_IN_SECOND = 1000
const QUARTER = 4

const QUARTER_HOUR = MINUTES_IN_HOUR / QUARTER
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR

export interface IPositionInfo {
    columns: number
    event: IRange<Date>
    index: number
    range: IRange<Date>
}

const eventPositioning = (
    {
        columns,
        event,
        index,
        range
    }: IPositionInfo
) => {
    const intersectedEvent = event.intersection(range)

    const start = quantiseQuarterHour(intersectedEvent.lower)
    const end = quantiseQuarterHour(intersectedEvent.upper)
    const quantisedStartHour = Math.max(
        0,
        Math.min(
            HOURS_IN_DAY,
            start.getHours() + (start.getMinutes() / MINUTES_IN_HOUR)
        )
    )
    const duration = Math.min(
        (end.getTime() - start.getTime()) / MILLISECONDS_IN_HOUR,
        HOURS_IN_DAY
    )

    return {
        height: `calc(100% / ${HOURS_IN_DAY} * ${duration})`,
        left: `calc(2.5% + (95% / ${columns} * ${index}))`,
        top: `calc(100% / ${HOURS_IN_DAY} * ${quantisedStartHour})`,
        width: `calc((95% / ${columns}))`
    }
}

const quantiseMinutes = (minutes: number) => (date: Date): Date => {
    const clone = new Date(date.getTime())
    clone.setMinutes(quantise(clone.getMinutes(), minutes), 0, 0)
    return clone
}

const quantiseQuarterHour = quantiseMinutes(QUARTER_HOUR)

export const quantise = (input: number, multiple: number) => Math.round(input / multiple) * multiple

export default eventPositioning
