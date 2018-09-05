import IConcreteEvent from '../IConcreteEvent'
import ILargeCalendarGroupedViewConfig from './ILargeCalendarGroupedViewConfig'

export default class LargeCalendarGroupedDaysAroundViewConfig
    implements ILargeCalendarGroupedViewConfig
{
    public readonly largeCalendarViewConfigType: string
    public readonly before: number
    public readonly after: number
    public readonly swimlaneForEvent: (event: IConcreteEvent) => string

    constructor(options: {
        before: number,
        after: number,
        swimlaneForEvent: (event: IConcreteEvent) => string
    }) {
        this.largeCalendarViewConfigType = 'GroupedDaysAroundView'
        this.before = options.before
        this.after = options.after
        this.swimlaneForEvent = options.swimlaneForEvent
    }
}
