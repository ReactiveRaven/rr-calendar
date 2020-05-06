import NumericallyComparable from './NumericallyComparable'

export default interface IRange<T extends NumericallyComparable> {
    lower: T
    upper: T

    containsValue(value: T): boolean
    containsRange(otherRange: IRange<T>): boolean
    overlapsRange(otherRange: IRange<T>): boolean

    intersection(otherRange: IRange<T>): IRange<T>
    union(otherRange: IRange<T>): IRange<T>
}