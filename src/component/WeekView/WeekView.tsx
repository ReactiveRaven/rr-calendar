import {createStyles, Theme, withStyles} from '@material-ui/core'
import * as React from 'react'
import {CSSProperties} from '../../../node_modules/@material-ui/core/styles/withStyles'
import {DAYS_IN_WEEK} from '../../constants'
import WeekDayStart from '../../enum/WeekDayStart'
import EventRenderer from '../../model/EventRenderer'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import Range from '../../utility/range/Range'
import {EventFields} from '../EventBlock/EventBlock'
import LargeCalendarDayColumn from '../LargeCalendarDayColumn/LargeCalendarDayColumn'

interface IWeekViewOwnProps {
    date: Date
    events: IConcreteEvent[]
    weekDayStart?: WeekDayStart
    emphasise?: Partial<Record<EventFields, boolean>>
    display?: Partial<Record<EventFields, boolean>>
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
    renderEvent?: EventRenderer
}

type ClassNames =
    | 'column'
    | 'root'

const styles = (theme: Theme): Record<ClassNames, CSSProperties> => createStyles({
    column: {
        flexGrow: 1,
        height: '100%'
    },
    root: {
        display: 'flex',
        height: '100%',
        width: '100%'
    }
})

type WeekViewProps = IWeekViewOwnProps & { classes: Record<ClassNames, string> }

const alternateColumns = 2

class WeekView extends React.Component<WeekViewProps, {}> {
    public render() {
        const {
            classes: {
                column,
                root
            },
            date,
            events,
            emphasise = {},
            display = {},
            weekDayStart = WeekDayStart.Monday,
            i18nConfig = {},
            delegate = {},
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

        return (
            <div className={root}>
                {
                    days
                        .map((columnDate, index) => (
                            <LargeCalendarDayColumn
                                alternate={(index % alternateColumns) === 1}
                                key={`${columnDate}`}
                                date={columnDate}
                                className={column}
                                emphasise={emphasise}
                                display={display}
                                events={relevantEvents}
                                i18nConfig={i18nConfig}
                                delegate={delegate}
                                renderEvent={renderEvent}
                            />
                        ))
                }
            </div>
        )
    }
}

export default withStyles(styles)(WeekView)
