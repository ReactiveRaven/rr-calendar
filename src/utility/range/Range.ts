import IRange from './IRange'

export default class Range implements IRange {
    public static fromToLessThan(lower: number, upper: number): Range {
        return new Range(lower, upper)
    }

    public readonly lower: number
    public readonly upper: number

    constructor(lower: number, upper: number) {
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

    public toString() {
        return `${this.lower}..<${this.upper}`
    }
}
