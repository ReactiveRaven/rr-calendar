import {createStyles, Theme, withStyles} from '@material-ui/core'
import {CSSProperties} from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import EventRenderer from '../../model/EventRenderer'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import ISwimlane from '../../model/ISwimlane'
import calculateSwimlanes from '../../utility/calculateSwimlanes'
import ClosedRange from '../../utility/range/ClosedRange'
import {EventFields} from '../EventBlock/EventBlock'
import VerticalSchedulerColumn from '../VerticalSchedulerColumn/VerticalSchedulerColumn'

interface IGroupedDaysAroundView {
    date: Date
    events: IConcreteEvent[]
    swimlaneForEvent: (event: IConcreteEvent) => string
    before?: number
    after?: number
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

type GroupedWeekViewProps = IGroupedDaysAroundView & { classes: Record<ClassNames, string> }

class GroupedDaysAroundView extends React.Component<GroupedWeekViewProps, {}> {
    public render() {
        const {
            after = 0,
            before = 0,
            classes: {
                column,
                root
            },
            date,
            emphasise,
            display,
            i18nConfig,
            delegate,
            events,
            swimlaneForEvent,
            renderEvent
        } = this.props

        const swimlanes = calculateSwimlanes(swimlaneForEvent, events)

        return (
            <div className={root}>
                {
                    ClosedRange.fromTo(-before, after)
                        .asArray()
                        .map(index => makeDate(date, index))
                        .map(mappedDate => (
                            <VerticalSchedulerColumn
                                className={column}
                                date={mappedDate}
                                display={display}
                                delegate={delegate}
                                emphasise={emphasise}
                                events={events}
                                i18nConfig={i18nConfig}
                                key={`${mappedDate.toISOString()}`}
                                renderEvent={renderEvent}
                                swimlanes={swimlanes}
                                swimlaneForEvent={this.swimlaneForEvent}
                            />
                        ))
                }
            </div>
        )
    }

    private swimlaneForEvent = (event: IConcreteEvent, swimlanes: ISwimlane[]): ISwimlane => {
        const swimlaneLabel = this.props.swimlaneForEvent(event)
        return swimlanes.filter(swimlane => swimlane.label === swimlaneLabel)[0]!
    }
}

const makeDate = (date: Date, dayDifference: number): Date => {
    const newDate = new Date(date)
    newDate.setHours(0, 0, 0, 0)
    newDate.setDate(newDate.getDate() + dayDifference)
    return newDate
}

export default withStyles(styles)(GroupedDaysAroundView)
