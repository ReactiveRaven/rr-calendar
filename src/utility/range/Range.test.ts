import Range from './Range'

// tslint:disable:no-magic-numbers
describe('Range', () => {
    describe('containsRange', () => {
        it('should return true if it wholly encloses the other', () => {

            expect(
                Range.fromToLessThan(0, 1)
                    .containsRange(Range.fromToLessThan(0, 1))
            )
                .toEqual(true)
            expect(
                Range.fromToLessThan(0, 100)
                    .containsRange(Range.fromToLessThan(10, 20))
            )
                .toEqual(true)
        })

        it('should return false if either end is outside of this range', () => {
            expect(
                Range.fromToLessThan(0, 100)
                    .containsRange(Range.fromToLessThan(50, 150))
            )
                .toEqual(false)

            expect(
                Range.fromToLessThan(0, 100)
                    .containsRange(Range.fromToLessThan(-50, 50))
            )
                .toEqual(false)
        })
    })

    describe('overlapsRange', () => {
        it('should return true if either end overlaps this range', () => {
            expect(
                Range.fromToLessThan(0, 100)
                    .overlapsRange(Range.fromToLessThan(50, 150))
            )
                .toEqual(true)
            expect(
                Range.fromToLessThan(0, 100)
                    .overlapsRange(Range.fromToLessThan(-50, 50))
            )
                .toEqual(true)
        })

        it('should return false if neither end overlaps this range', () => {
            expect(
                Range.fromToLessThan(0, 1)
                    .overlapsRange(Range.fromToLessThan(1, 2))
            )
                .toEqual(false)
        })

        it('should handle the other range being a half-open properly', () => {
            expect(
                Range.fromToLessThan(100, 200)
                    .overlapsRange(Range.fromToLessThan(0, 100))
            )
                .toEqual(false)

            expect(
                Range.fromToLessThan(0, 100)
                    .overlapsRange(Range.fromToLessThan(100, 200))
            )
                .toEqual(false)
        })

        it('should handle being entirely enclosed by the other range', () => {
            expect(
                Range.fromToLessThan(25, 75)
                    .overlapsRange(Range.fromToLessThan(0, 100))
            )
                .toEqual(true)
        })
    })

    describe('union', () => {
        it('should return a range that encompases both ranges', () => {
            const union = Range.fromToLessThan(25, 75)
                .union(Range.fromToLessThan(50, 100))
            expect(union.lower).toEqual(25)
            expect(union.upper).toEqual(100)
        })

        it('should handle being entirely enclosed', () => {
            const union = Range.fromToLessThan(25, 75)
                .union(Range.fromToLessThan(0, 100))

            expect(union.lower).toEqual(0)
            expect(union.upper).toEqual(100)
        })

        it('should throw if ranges do not overlap', () => {
            expect(() => {
                Range.fromToLessThan(0, 25)
                    .union(Range.fromToLessThan(75, 100))
            }).toThrow()
        })
    })

    describe('equals', () => {
        it('should return true if ranges are equal', () => {
            expect(
                Range.fromToLessThan(0, 100)
                    .equals(Range.fromToLessThan(0, 100))
            )
                .toEqual(true)
        })

        it('should return false if ranges are not equal', () => {
            expect(
                Range.fromToLessThan(0, 100)
                    .equals(Range.fromToLessThan(100, 200))
            )
                .toEqual(false)
        })
    })

    describe('asArray', () => {
        it('should return an integer array, excluding the upper bound, by default', () => {
            expect(Range.fromToLessThan(1, 4).asArray())
                .toEqual([1, 2, 3])
        })

        it('should handle floats', () => {
            expect(Range.fromToLessThan(1.5, 4.5).asArray())
                .toEqual([1.5, 2.5, 3.5])
        })

        it('should handle custom step sizes', () => {
            expect(Range.fromToLessThan(0.0, 1).asArray(0.25))
                .toEqual([0, 0.25, 0.5, 0.75])
        })
    })
})
// tslint:enable:no-magic-numbers
