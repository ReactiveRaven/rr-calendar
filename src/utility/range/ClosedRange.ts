import IRange from './IRange'
import NumericallyComparable from './NumericallyComparable'
import Range from './Range'

export default class ClosedRange<T extends NumericallyComparable> implements IRange<T> {
    public static fromTo<T extends NumericallyComparable>(lower: T, upper: T): ClosedRange<T> {
        return new ClosedRange(lower, upper)
    }

    public readonly lower: T
    public readonly upper: T

    private constructor(lower: T, upper: T) {
        if (lower > upper) {
            throw new RangeError(`Range ${lower}...${upper} is invalid`)
        }
        this.lower = lower
        this.upper = upper
    }

    public containsValue(value: T) {
        return value >= this.lower && value <= this.upper
    }

    public containsRange(range: IRange<T>) {
        return this.containsValue(range.lower) && this.containsValue(range.upper)
    }

    public overlapsRange(range: IRange<T>) {
        return this.containsValue(range.lower) || this.containsValue(range.upper)
    }

    public union(otherRange: IRange<T>): IRange<T> {
        if (!this.overlapsRange(otherRange)) {
            throw new Error(
                `Cannot form union of ${this.toString()} and ${otherRange.toString()}; ` +
                'they do not overlap'
            )
        }

        const newLower = this.lower < otherRange.lower ? this.lower : otherRange.lower
        const newUpper = this.upper > otherRange.upper ? this.upper : otherRange.upper

        if (
            (
                otherRange.upper === newUpper &&
                otherRange.containsValue(newUpper)
            ) ||
            (
                this.upper === newUpper
            )
        ) {
            return ClosedRange.fromTo(newLower, newUpper)
        } else {
            return Range.fromToLessThan(newLower, newUpper)
        }
    }

    public intersection(otherRange: IRange<T>): IRange<T> {
        if (!this.overlapsRange(otherRange)) {
            throw new Error(
                `Cannot form union of ${this.toString()} and ${otherRange.toString()}; ` +
                'they do not overlap'
            )
        }

        const newLower = this.lower > otherRange.lower ? this.lower : otherRange.lower
        const newUpper = this.upper < otherRange.upper ? this.upper : otherRange.upper

        if (
            (
                otherRange.upper === newUpper &&
                otherRange.containsValue(newUpper)
            ) ||
            (
                this.upper === newUpper
            )
        ) {
            return ClosedRange.fromTo(newLower, newUpper)
        } else {
            return Range.fromToLessThan(newLower, newUpper)
        }
    }

    public asArray = (step: number = 1) => {
        if (step <= 0) {
            throw new Error(
                `asArray given a step of ${step}; which would cause an infinite loop`
            )
        }
        const array: T[] = [this.lower]
        let pointer = this.add(this.lower, step)
        while (pointer <= this.upper) {
            array.push(pointer)
            pointer = this.add(pointer, step)
        }
        return array
    }

    public equals(otherRange: ClosedRange<T>): boolean {
        return otherRange.lower === this.lower && otherRange.upper === this.upper
    }

    public toString() {
        return `${this.lower}...${this.upper}`
    }

    private add = (left: T, right: number): T => {
        if (left instanceof Date) {
            // tslint:disable-next-line:no-any
            return (new Date(left.getTime() + right) as any) as T
        } else {
            // tslint:disable-next-line:no-any
            return ((left.valueOf() + right) as any) as T
        }
    }
}
