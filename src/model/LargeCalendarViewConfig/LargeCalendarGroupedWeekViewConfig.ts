import IConcreteEvent from '../IConcreteEvent'
import ILargeCalendarGroupedViewConfig from './ILargeCalendarGroupedViewConfig'

export default class LargeCalendarGroupedWeekViewConfig implements ILargeCalendarGroupedViewConfig {
    public readonly largeCalendarViewConfigType: string
    public readonly swimlaneForEvent: (event: IConcreteEvent) => string

    constructor(options: {
        swimlaneForEvent: (event: IConcreteEvent) => string
    }) {
        this.largeCalendarViewConfigType = 'GroupedWeekView'
        this.swimlaneForEvent = options.swimlaneForEvent
    }
}
