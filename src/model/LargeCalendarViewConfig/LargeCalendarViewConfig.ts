import LargeCalendarDaysAroundViewConfig from './LargeCalendarDaysAroundViewConfig'
import LargeCalendarWeekViewConfig from './LargeCalendarWeekViewConfig'

export default abstract class LargeCalendarViewConfig {
    public static weekView(): LargeCalendarWeekViewConfig {
        return new LargeCalendarWeekViewConfig()
    }

    public static dayView(): LargeCalendarDaysAroundViewConfig {
        return new LargeCalendarDaysAroundViewConfig({after: 0, before: 0})
    }

    public static daysAroundView(
        options: { before: number, after: number }
    ): LargeCalendarDaysAroundViewConfig {
        return new LargeCalendarDaysAroundViewConfig(options)
    }
}