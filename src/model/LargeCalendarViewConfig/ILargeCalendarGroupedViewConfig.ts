import IConcreteEvent from '../IConcreteEvent'
import ILargeCalendarViewConfig from './ILargeCalendarViewConfig'

export default interface ILargeCalendarGroupedViewConfig extends ILargeCalendarViewConfig {
    swimlaneForEvent: (event: IConcreteEvent) => string
}
