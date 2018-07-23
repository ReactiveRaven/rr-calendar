import ILargeCalendarViewConfig from './ILargeCalendarViewConfig'

export default class LargeCalendarDaysAroundViewConfig implements ILargeCalendarViewConfig {
    public readonly largeCalendarViewConfigType: string
    public readonly before: number
    public readonly after: number

    constructor(options: {before: number, after: number}) {
        this.largeCalendarViewConfigType = 'DaysAroundView'
        this.before = options.before
        this.after = options.after
    }
}