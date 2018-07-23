import * as React from 'react'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import Range from '../../utility/range/Range'
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
            delegate
        } = this.props

        return (
            <React.Fragment>
                {
                    Range
                        .fromToLessThan(0, before)
                        .asArray()
                        .reverse()
                        .map(index => makeDate(date, -(index + 1)))
                        .map(beforeDate =>
                            <LargeCalendarDayColumn
                                date={beforeDate}
                                display={display}
                                emphasise={emphasise}
                                events={[]}
                                key={`before${beforeDate.toISOString()}`}
                                i18nConfig={i18nConfig}
                                delegate={delegate}
                            />
                        )
                }
                <LargeCalendarDayColumn
                    date={date}
                    display={display}
                    emphasise={emphasise}
                    events={[]}
                    i18nConfig={i18nConfig}
                    delegate={delegate}
                />
                {
                    Range
                        .fromToLessThan(0, after)
                        .asArray()
                        .map(index => makeDate(date, (index + 1)))
                        .map(afterDate =>
                            <LargeCalendarDayColumn
                                date={afterDate}
                                display={display}
                                emphasise={emphasise}
                                events={[]}
                                key={`after${afterDate.toISOString()}`}
                                i18nConfig={i18nConfig}
                                delegate={delegate}
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
