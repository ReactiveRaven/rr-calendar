import * as React from 'react'
import EventRenderer from '../../model/EventRenderer'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import ClosedRange from '../../utility/range/ClosedRange'
import {EventFields} from '../EventBlock/EventBlock'
import LargeCalendarDayColumn from '../LargeCalendarDayColumn/LargeCalendarDayColumn'

interface IDaysAroundView {
    date: Date
    events: IConcreteEvent[]
    before?: number
    after?: number
    emphasise?: Partial<Record<EventFields, boolean>>
    display?: Partial<Record<EventFields, boolean>>
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
    renderEvent?: EventRenderer
}

class DaysAroundView extends React.Component<IDaysAroundView, {}> {
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
            renderEvent
        } = this.props

        const dates = ClosedRange.fromTo(-before, after)
            .asArray()
            .map(index => makeDate(date, index))

        return (
            <React.Fragment>
                { dates
                    .map(currentDate =>
                        <LargeCalendarDayColumn
                            date={currentDate}
                            display={display}
                            emphasise={emphasise}
                            events={events}
                            key={currentDate.toISOString()}
                            i18nConfig={i18nConfig}
                            delegate={delegate}
                            renderEvent={renderEvent}
                        />
                    )
                }
            </React.Fragment>
        )
    }
}

const makeDate = (date: Date, dayDifference: number): Date => {
    const newDate = new Date(date)
    newDate.setHours(0, 0, 0, 0)
    newDate.setDate(newDate.getDate() + dayDifference)
    return newDate
}

export default DaysAroundView
