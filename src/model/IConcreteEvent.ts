import ISimpleEvent from './ISimpleEvent'

export default interface IConcreteEvent extends ISimpleEvent {
    start: Date
    end: Date
    description: string
    className: string
    accentClassName: string
}
