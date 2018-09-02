import ILocation from './ILocation'
import IPerson from './IPerson'
import ISimpleEvent from './ISimpleEvent'

export default interface IConcreteEvent extends ISimpleEvent {
    start: Date
    end: Date
    className: string
    accentClassName: string
    people: IPerson[]
    location?: ILocation
    attributes: { [P: string]: string }
}
