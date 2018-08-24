import * as React from 'react'
import {DAYS_IN_WEEK} from '../../constants'
import {ClosedRange} from '../../utility/range'
import LargeCalendarDayColumn from '../LargeCalendarDayColumn/LargeCalendarDayColumn'
import {WeekDayStart} from '../SmallCalendar/SmallCalendar'

interface IWeekViewOwnProps {
    selectedDate: Date
    weekStartsOn?: WeekDayStart
}

class WeekView extends React.Component<IWeekViewOwnProps, {}> {
    public render() {
        const {
            selectedDate,
            weekStartsOn = WeekDayStart.Monday
        } = this.props
        const startOfWeek = selectedDate
        startOfWeek.setHours(0, 0, 0, 0)
        const targetWeekdayIndex = (DAYS_IN_WEEK + weekStartsOn.valueOf()) % DAYS_IN_WEEK
        while (startOfWeek.getDay() !== targetWeekdayIndex) {
            startOfWeek.setDate(startOfWeek.getDate() - 1)
        }
        return (
            <React.Fragment>
                {
                    ClosedRange.fromTo(0, DAYS_IN_WEEK - 1)
                        .asArray
                        .map(index => {
                            const currentDay = new Date(startOfWeek)
                            currentDay.setDate(currentDay.getDate() + index)
                            return <LargeCalendarDayColumn key={`${index}`} date={currentDay}/>
                        })
                }
            </React.Fragment>
        )
    }
}

export default WeekView