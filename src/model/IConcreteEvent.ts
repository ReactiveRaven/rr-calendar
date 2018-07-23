import ILocation from './ILocation'
import IPerson from './IPerson'

export default interface IConcreteEvent {
    start: Date
    end: Date
    className: string
    accentClassName: string
    people: IPerson[]
    location?: ILocation
    attributes: { [P: string]: string }
}
