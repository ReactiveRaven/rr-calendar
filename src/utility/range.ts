export class ClosedRange {
    public static fromTo(lower: number, upper: number): ClosedRange {
        return new ClosedRange(lower, upper)
    }

    private readonly lower: number
    private readonly upper: number

    constructor(lower: number, upper: number) {
        if (lower > upper) { throw new RangeError(`Range ${lower}...${upper} is invalid`) }
        this.lower = lower
        this.upper = upper
    }

    public containsValue(value: number) {
        return value >= this.lower && value <= this.upper
    }

    public containsRange(range: ClosedRange) {
        return this.containsValue(range.lower) && this.containsValue(range.upper)
    }

    public get asArray(): number[] {
        const array: number[] = []
        for (let index = this.lower; index <= this.upper; index++) {
            array.push(index)
        }
        return array
    }
}