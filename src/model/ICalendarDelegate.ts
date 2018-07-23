import IConcreteEvent from './IConcreteEvent'
import IPerson from './IPerson'

export default interface ICalendarDelegate {
    onFocusDate?: (date: Date) => void
    onSelectDate?: (date: Date) => void
    onHoverEvent?: (event: IConcreteEvent) => void
    onFocusEvent?: (event: IConcreteEvent) => void
    onSelectEvent?: (event: IConcreteEvent) => void
    onSelectPerson?: (person: IPerson, event: IConcreteEvent) => void
}