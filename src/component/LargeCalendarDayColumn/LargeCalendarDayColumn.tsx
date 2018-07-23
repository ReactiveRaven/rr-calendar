import * as React from 'react'

interface ILargeCalendarDayColumnProps {
    date: Date
    weekdayFormatter?: (date: Date) => string
    dateFormatter?: (date: Date) => string
}

const defaultWeekdayFormatter = Intl.DateTimeFormat(navigator.language, { weekday: 'short' }).format
const defaultDateFormatter = Intl.DateTimeFormat(navigator.language, { day: 'numeric' }).format

export type LargeCalendarDayColumnProps = ILargeCalendarDayColumnProps

export const TESTING_CLASS_NAMES = {
    body: 'large-calendar-day-column-body',
    header: 'large-calendar-day-column-header',
    hourCell: 'large-calendar-day-column-cell'
}

const HOURS_IN_DAY = 24

class LargeCalendarDayColumn extends React.Component<LargeCalendarDayColumnProps, {}> {
    public render() {
        const weekdayFormatter = this.props.weekdayFormatter || defaultWeekdayFormatter
        const dateFormatter = this.props.dateFormatter || defaultDateFormatter

        const hourCellClassName = [ TESTING_CLASS_NAMES.hourCell ].join(' ')

        return <div>
            <div className={[TESTING_CLASS_NAMES.header].join(' ')}>
                <span>
                    {weekdayFormatter(this.props.date)}
                </span>
                <span>
                    {dateFormatter(this.props.date)}
                </span>
            </div>
            <div className={[TESTING_CLASS_NAMES.body].join(' ')}>
                {
                    (new Array(HOURS_IN_DAY))
                        .fill(undefined)
                        .map((_, index) => <div key={`${index}`} className={hourCellClassName} />)
                }
            </div>
        </div>
    }
}

export default LargeCalendarDayColumn