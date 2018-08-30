const MINUTES_IN_HOUR = 60
const QUARTER = 4

const QUARTER_HOUR = MINUTES_IN_HOUR / QUARTER

const eventPositioning = (
    event: { end: Date, start: Date },
    positionInfo: { columns: number, index: number },
    date: Date
) => {
    const midnight = new Date(date)
    midnight.setHours(0, 0, 0, 0)
    const tomorrow = new Date(midnight)
    tomorrow.setDate(midnight.getDate() + 1)
    tomorrow.setMilliseconds(-1)

    const { columns, index } = positionInfo
    const start = event.start >= midnight ? event.start : midnight
    const end = event.end < tomorrow ? event.end : tomorrow
    const quantisedStartHour = (
        start.getHours() +
        (Math.round(start.getMinutes() / QUARTER_HOUR) / QUARTER)
    )
    const quantisedEndHour = (
        end.getHours() +
        (Math.round(end.getMinutes() / QUARTER_HOUR) / QUARTER)
    )
    const duration = quantisedEndHour - quantisedStartHour

    return {
        height: `calc(100% / 24 * ${duration})`,
        left: `calc(2.5% + (95% / ${columns} * ${index}))`,
        top: `calc(100% / 24 * ${quantisedStartHour})`,
        width: `calc((95% / ${columns}))`
    }
}

export default eventPositioning
