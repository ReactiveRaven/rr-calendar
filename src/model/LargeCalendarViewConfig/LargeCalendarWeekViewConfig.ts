import ILargeCalendarViewConfig from './ILargeCalendarViewConfig'

export default class LargeCalendarWeekViewConfig implements ILargeCalendarViewConfig {
    public readonly largeCalendarViewConfigType: string

    constructor() {
        this.largeCalendarViewConfigType = 'WeekView'
    }
}