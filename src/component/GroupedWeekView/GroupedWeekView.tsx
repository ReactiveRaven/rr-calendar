import {withStyles} from '@material-ui/core'
import * as React from 'react'
import {DAYS_IN_WEEK} from '../../constants'
import WeekDayStart from '../../enum/WeekDayStart'
import EventRenderer from '../../model/EventRenderer'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import ISwimlane from '../../model/ISwimlane'
import calculateSwimlanes from '../../utility/calculateSwimlanes'
import Range from '../../utility/range/Range'
import {EventFields} from '../EventBlock/EventBlock'
import VerticalSchedulerColumn from '../VerticalSchedulerColumn/VerticalSchedulerColumn'
import ClassNames from './ClassNames'
import styles from './styles'

interface IGroupedWeekViewOwnProps<T extends IConcreteEvent> {
    date: Date
    events: T[]
    swimlaneForEvent: (event: IConcreteEvent) => string
    weekDayStart?: WeekDayStart
    display?: Partial<Record<EventFields, boolean>>
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
    renderEvent?: EventRenderer
}

type GroupedWeekViewProps<T extends IConcreteEvent> =
    IGroupedWeekViewOwnProps<T> &
    { classes: Record<ClassNames, string> }

class GroupedWeekView<T extends IConcreteEvent>
    extends React.Component<GroupedWeekViewProps<T>, {}>
{
    public render() {
        const {
            classes: {
                column,
                root
            },
            date,
            events,
            display = {},
            weekDayStart = WeekDayStart.Monday,
            i18nConfig = {},
            delegate = {},
            swimlaneForEvent,
            renderEvent
        } = this.props

        const midnight = new Date(date)
        midnight.setHours(0, 0, 0, 0)
        const targetDayIndex = (weekDayStart.valueOf() + DAYS_IN_WEEK) % DAYS_IN_WEEK
        while (midnight.getDay() !== targetDayIndex) {
            midnight.setDate(midnight.getDate() - 1)
        }
        const endOfWeek = new Date(midnight)
        endOfWeek.setDate(endOfWeek.getDate() + DAYS_IN_WEEK)

        const days = Range.fromToLessThan(0, DAYS_IN_WEEK)
            .asArray()
            .map(index => {
                const columnDate = new Date(midnight)
                columnDate.setDate(columnDate.getDate() + index)
                return columnDate
            })

        const weekRange = Range.fromToLessThan(midnight.getTime(), endOfWeek.getTime())
        const relevantEvents = events.filter(event =>
            Range.fromToLessThan(event.start.getTime(), event.end.getTime())
                .overlapsRange(weekRange)
        )

        const swimlanes = calculateSwimlanes(swimlaneForEvent, relevantEvents)

        const innerSwimlaneForEvent = (
            event: IConcreteEvent,
            swimlanez: ISwimlane[]
        ): ISwimlane => {
            const swimlaneLabel = swimlaneForEvent(event)
            return swimlanez.filter(swimlane => swimlane.label === swimlaneLabel)[0]
        }

        return (
            <div className={root}>
                {
                    days
                        .map(columnDate => (
                            <VerticalSchedulerColumn
                                key={`${columnDate}`}
                                date={columnDate}
                                className={column}
                                display={display}
                                events={relevantEvents}
                                i18nConfig={i18nConfig}
                                delegate={delegate}
                                swimlanes={swimlanes}
                                swimlaneForEvent={innerSwimlaneForEvent}
                                renderEvent={renderEvent}
                            />
                        ))
                }
            </div>
        )
    }
}

export default withStyles(styles)(GroupedWeekView)
