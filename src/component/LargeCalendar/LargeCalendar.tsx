import * as React from 'react'
import LargeCalendarDayColumn from '../LargeCalendarDayColumn/LargeCalendarDayColumn'

export default class LargeCalendar extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <LargeCalendarDayColumn />
            </div>
        )
    }
}