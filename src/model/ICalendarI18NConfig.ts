import WeekDayStart from '../enum/WeekDayStart'

export default interface ICalendarI18NConfig {
    weekDayStart?: WeekDayStart
    weekDayFormatter?: (date: Date) => string
    monthDayFormatter?: (date: Date) => string
    timeFormatter?: (date: Date) => string
}