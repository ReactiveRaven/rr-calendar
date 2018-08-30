import IConcreteEvent from './IConcreteEvent'

export default interface ICalendarDelegate {
    onFocusDate?: (date: Date) => void
    onSelectDate?: (date: Date) => void
    onHoverEvent?: (event: IConcreteEvent, ref: React.RefObject<HTMLElement>) => void
    onFocusEvent?: (event: IConcreteEvent, ref: React.RefObject<HTMLElement>) => void
    onSelectEvent?: (event: IConcreteEvent, ref: React.RefObject<HTMLElement>) => void
}
