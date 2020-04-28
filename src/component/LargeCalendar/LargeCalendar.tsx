import * as React from 'react'
import EventRenderer from '../../model/EventRenderer'
import ICalendarDelegate from '../../model/ICalendarDelegate'
import ICalendarI18NConfig from '../../model/ICalendarI18NConfig'
import IConcreteEvent from '../../model/IConcreteEvent'
import ILargeCalendarViewConfig from '../../model/LargeCalendarViewConfig/ILargeCalendarViewConfig'
import LargeCalendarDaysAroundViewConfig
    from '../../model/LargeCalendarViewConfig/LargeCalendarDaysAroundViewConfig'
import LargeCalendarGroupedDaysAroundViewConfig
    from '../../model/LargeCalendarViewConfig/LargeCalendarGroupedDaysAroundViewConfig'
import LargeCalendarGroupedWeekViewConfig
    from '../../model/LargeCalendarViewConfig/LargeCalendarGroupedWeekViewConfig'
import LargeCalendarViewConfig from '../../model/LargeCalendarViewConfig/LargeCalendarViewConfig'
import LargeCalendarWeekViewConfig
    from '../../model/LargeCalendarViewConfig/LargeCalendarWeekViewConfig'
import DaysAroundView from '../DaysAroundView/DaysAroundView'
import {EventFields} from '../EventBlock/EventBlock'
import GroupedDaysAroundView from '../GroupedDaysAroundView/GroupedDaysAroundView'
import GroupedWeekView from '../GroupedWeekView/GroupedWeekView'
import WeekView from '../WeekView/WeekView'

export interface ILargeCalendarOwnProps {
    date: Date
    now: Date
    events: IConcreteEvent[]
    emphasise?: Partial<Record<EventFields, boolean>>
    display?: Partial<Record<EventFields, boolean>>
    viewConfig?: ILargeCalendarViewConfig
    i18nConfig?: ICalendarI18NConfig
    delegate?: ICalendarDelegate
    renderEvent?: EventRenderer
}

export default class LargeCalendar extends React.Component<ILargeCalendarOwnProps, {}> {
    public render() {
        const {
            delegate,
            display,
            emphasise,
            events,
            date,
            now,
            i18nConfig,
            viewConfig = LargeCalendarViewConfig.weekView(),
            renderEvent
        } = this.props

        const sharedProps = {
            date,
            delegate,
            display,
            emphasise,
            events,
            i18nConfig,
            now,
            renderEvent
        }

        if (viewConfig instanceof LargeCalendarWeekViewConfig) {
            return (
                <WeekView {...sharedProps} />
            )
        }

        if (viewConfig instanceof LargeCalendarDaysAroundViewConfig) {
            return (
                <DaysAroundView
                    {...sharedProps}
                    before={viewConfig.before}
                    after={viewConfig.after}
                />
            )
        }

        if (viewConfig instanceof LargeCalendarGroupedWeekViewConfig) {
            return (
                <GroupedWeekView
                    {...sharedProps}
                    swimlaneForEvent={viewConfig.swimlaneForEvent}
                />
            )
        }

        if (viewConfig instanceof LargeCalendarGroupedDaysAroundViewConfig) {
            return (
                <GroupedDaysAroundView
                    swimlaneForEvent={viewConfig.swimlaneForEvent}
                    {...sharedProps}
                />
            )
        }

        throw new Error(
            `Unexpected view config: ${viewConfig.largeCalendarViewConfigType}`
        )
    }
}
