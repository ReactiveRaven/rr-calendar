import IRange from './IRange'

export default class ClosedRange implements IRange {
    public static fromTo(lower: number, upper: number): ClosedRange {
        return new ClosedRange(lower, upper)
    }

    public readonly lower: number
    public readonly upper: number

    private constructor(lower: number, upper: number) {
        if (lower > upper) {
            throw new RangeError(`Range ${lower}...${upper} is invalid`)
        }
        this.lower = lower
        this.upper = upper
    }

    public containsValue(value: number) {
        return value >= this.lower && value <= this.upper
    }

    public containsRange(range: IRange) {
        return this.containsValue(range.lower) && this.containsValue(range.upper)
    }

    public overlapsRange(range: IRange) {
        return this.containsValue(range.lower) || this.containsValue(range.upper)
    }

    public union(otherRange: ClosedRange) {
        if (!this.overlapsRange(otherRange)) {
            throw new Error(
                `Cannot form union of ${this.toString()} and ${otherRange.toString()}; ` +
                'they do not overlap'
            )
        }

        return ClosedRange.fromTo(
            Math.min(this.lower, otherRange.lower),
            Math.max(this.upper, otherRange.upper)
        )
    }

    public asArray = (step: number = 1) => {
        if (step <= 0) {
            throw new Error(
                `asArray given a step of ${step}; which would cause an infinite loop`
            )
        }
        const array: number[] = [this.lower]
        let pointer = this.lower + step
        while (pointer <= this.upper) {
            array.push(pointer)
            pointer += step
        }
        return array
    }

    public equals(otherRange: ClosedRange): boolean {
        return otherRange.lower === this.lower && otherRange.upper === this.upper
    }

    public toString() {
        return `${this.lower}...${this.upper}`
    }
}
