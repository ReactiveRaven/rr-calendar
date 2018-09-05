import * as React from 'react'
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
}

class GroupedDaysAroundView extends React.Component<IGroupedDaysAroundView, {}> {
    public render() {
        const {
            after = 0,
            before = 0,
            date,
            emphasise,
            display,
            i18nConfig,
            delegate,
            events,
            swimlaneForEvent
        } = this.props

        const swimlanes = calculateSwimlanes(swimlaneForEvent, events)

        return (
            <React.Fragment>
                {
                    ClosedRange.fromTo(-before, after)
                        .asArray()
                        .map(index => makeDate(date, index))
                        .map(mappedDate => (
                            <VerticalSchedulerColumn
                                date={mappedDate}
                                display={display}
                                emphasise={emphasise}
                                events={events}
                                key={`${mappedDate.toISOString()}`}
                                i18nConfig={i18nConfig}
                                delegate={delegate}
                                swimlanes={swimlanes}
                                swimlaneForEvent={this.swimlaneForEvent}
                            />
                        ))
                }
            </React.Fragment>
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

export default GroupedDaysAroundView
