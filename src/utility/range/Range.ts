import IRange from './IRange'
import NumericallyComparable from './NumericallyComparable'

export default class Range<T extends NumericallyComparable> implements IRange<T> {
    public static fromToLessThan<T extends NumericallyComparable>(lower: T, upper: T): Range<T> {
        return new Range(lower, upper)
    }

    public static emptyNumeric(): Range<number> {
        const zero = 0
        return new Range(zero, zero)
    }

    public static emptyDate(): Range<Date> {
        const zeroDate = new Date(0)
        return new Range(zeroDate, zeroDate)
    }

    public readonly lower: T
    public readonly upper: T

    private constructor(lower: T, upper: T) {
        if (lower > upper) {
            throw new RangeError(`Range ${lower}..<${upper} is invalid`)
        }

        this.lower = lower
        this.upper = upper
    }

    public containsValue(value: T) {
        return value >= this.lower && value < this.upper
    }

    public containsRange(otherRange: IRange<T>) {
        return (
            this.containsValue(otherRange.lower) &&
            (
                this.containsValue(otherRange.upper) ||
                (
                    otherRange instanceof Range &&
                    otherRange.upper === this.upper
                )
            )
        )
    }

    public overlapsRange(otherRange: IRange<T>) {
        return (
            otherRange.upper > this.lower &&
                otherRange.lower < this.upper
        )
    }

    public union(otherRange: Range<T>) {
        if (!this.overlapsRange(otherRange)) {
            throw new Error(
                `Cannot form union of ${this.toString()} and ${otherRange.toString()}; ` +
                    'they do not overlap'
            )
        }

        return Range.fromToLessThan(
            this.lower < otherRange.lower ? this.lower : otherRange.lower,
            this.upper > otherRange.upper ? this.upper : otherRange.upper,
        )
    }

    public asArray(stepOrMilliseconds: number = 1): T[] {
        if (stepOrMilliseconds <= 0) {
            throw new Error(
                `asArray given a step of ${stepOrMilliseconds}; which would cause an infinite loop`
            )
        }
        const array: T[] = []
        let pointer = this.lower
        while (pointer < this.upper) {
            array.push(pointer)
            pointer = this.add(pointer, stepOrMilliseconds)
        }
        return array
    }

    public equals(otherRange: Range<T>): boolean {
        return otherRange.lower === this.lower && otherRange.upper === this.upper
    }

    public toString() {
        return `${this.lower}..<${this.upper}`
    }

    private add(left: T, right: number): T {
        if (left instanceof Date) {
            // tslint:disable-next-line:no-any
            return (new Date(left.getTime() + right) as any) as T
        } else {
            // tslint:disable-next-line:no-any
            return ((left.valueOf() + right) as any) as T
        }
    }
}
