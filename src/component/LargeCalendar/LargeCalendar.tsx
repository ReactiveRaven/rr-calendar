import * as React from 'react'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import ILargeCalendarViewConfig from '../../model/LargeCalendarViewConfig/ILargeCalendarViewConfig'
import LargeCalendarDaysAroundViewConfig
    from '../../model/LargeCalendarViewConfig/LargeCalendarDaysAroundViewConfig'
import LargeCalendarViewConfig from '../../model/LargeCalendarViewConfig/LargeCalendarViewConfig'
import LargeCalendarWeekViewConfig
    from '../../model/LargeCalendarViewConfig/LargeCalendarWeekViewConfig'
import DaysAroundView from '../DaysAroundView/DaysAroundView'
import {EventFields} from '../EventBlock/EventBlock'
import WeekView from '../WeekView/WeekView'

interface ILargeCalendarOwnProps {
    date: Date
    events: IConcreteEvent[]
    emphasise?: Partial<Record<EventFields, boolean>>
    display?: Partial<Record<EventFields, boolean>>
    viewConfig?: ILargeCalendarViewConfig
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
}

export default class LargeCalendar extends React.Component<ILargeCalendarOwnProps, {}> {
    public render() {
        const {
            delegate,
            display,
            emphasise,
            events,
            date,
            i18nConfig,
            viewConfig = LargeCalendarViewConfig.weekView()
        } = this.props

        if (viewConfig instanceof LargeCalendarWeekViewConfig) {
            return (
                <WeekView
                    date={date}
                    events={events}
                    display={display}
                    emphasise={emphasise}
                    i18nConfig={i18nConfig}
                    delegate={delegate}
                />
            )
        }

        if (viewConfig instanceof LargeCalendarDaysAroundViewConfig) {
            return (
                <DaysAroundView
                    date={date}
                    events={events}
                    display={display}
                    emphasise={emphasise}
                    i18nConfig={i18nConfig}
                    delegate={delegate}
                />
            )
        }

        throw new Error(
            `Unexpected view config: ${viewConfig.largeCalendarViewConfigType}`
        )
    }
}