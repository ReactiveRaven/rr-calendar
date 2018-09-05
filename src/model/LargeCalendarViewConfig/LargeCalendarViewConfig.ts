import IConcreteEvent from '../IConcreteEvent'
import LargeCalendarDaysAroundViewConfig from './LargeCalendarDaysAroundViewConfig'
import LargeCalendarGroupedDaysAroundViewConfig from './LargeCalendarGroupedDaysAroundViewConfig'
import LargeCalendarGroupedWeekViewConfig from './LargeCalendarGroupedWeekViewConfig'
import LargeCalendarWeekViewConfig from './LargeCalendarWeekViewConfig'

export default abstract class LargeCalendarViewConfig {
    public static weekView(): LargeCalendarWeekViewConfig {
        return new LargeCalendarWeekViewConfig()
    }

    public static groupedWeekView(options: {
        swimlaneForEvent: (event: IConcreteEvent) => string
    }): LargeCalendarGroupedWeekViewConfig {
        return new LargeCalendarGroupedWeekViewConfig(options)
    }

    public static dayView(): LargeCalendarDaysAroundViewConfig {
        return new LargeCalendarDaysAroundViewConfig({after: 0, before: 0})
    }

    public static groupedDayView(options: {
        swimlaneForEvent: (event: IConcreteEvent) => string
    }): LargeCalendarGroupedDaysAroundViewConfig {
        return new LargeCalendarGroupedDaysAroundViewConfig({after: 0, before: 0, ...options})
    }

    public static daysAroundView(
        options: { before: number, after: number }
    ): LargeCalendarDaysAroundViewConfig {
        return new LargeCalendarDaysAroundViewConfig(options)
    }

    public static groupedDaysAroundView(
        options: {
            after: number,
            before: number,
            swimlaneForEvent: (event: IConcreteEvent) => string
        }
    ): LargeCalendarGroupedDaysAroundViewConfig {
        return new LargeCalendarGroupedDaysAroundViewConfig(options)
    }
}
