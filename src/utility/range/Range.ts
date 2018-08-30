import IRange from './IRange'

export default class Range implements IRange {
    public static fromToLessThan(lower: number, upper: number): Range {
        return new Range(lower, upper)
    }

    public static get empty() {
        return Range.fromToLessThan(0, 0)
    }

    public readonly lower: number
    public readonly upper: number

    private constructor(lower: number, upper: number) {
        if (lower > upper) {
            throw new RangeError(`Range ${lower}..<${upper} is invalid`)
        }

        this.lower = lower
        this.upper = upper
    }

    public containsValue(value: number) {
        return value >= this.lower && value < this.upper
    }

    public containsRange(otherRange: IRange) {
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

    public overlapsRange(otherRange: IRange) {
        return (
            otherRange.upper > this.lower &&
                otherRange.lower < this.upper
        )
    }

    public union(otherRange: Range) {
        if (!this.overlapsRange(otherRange)) {
            throw new Error(
                `Cannot form union of ${this.toString()} and ${otherRange.toString()}; ` +
                    'they do not overlap'
            )
        }

        return Range.fromToLessThan(
            Math.min(this.lower, otherRange.lower),
            Math.max(this.upper, otherRange.upper)
        )
    }

    public asArray(step: number = 1) {
        if (step <= 0) {
            throw new Error(
                `asArray given a step of ${step}; which would cause an infinite loop`
            )
        }
        const array: number[] = []
        let pointer = this.lower
        while (pointer < this.upper) {
            array.push(pointer)
            pointer += step
        }
        return array
    }

    public equals(otherRange: Range): boolean {
        return otherRange.lower === this.lower && otherRange.upper === this.upper
    }

    public toString() {
        return `${this.lower}..<${this.upper}`
    }
}
