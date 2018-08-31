import NumericallyComparable from './NumericallyComparable'

export default interface IRange<T extends NumericallyComparable> {
    lower: T
    upper: T
}
