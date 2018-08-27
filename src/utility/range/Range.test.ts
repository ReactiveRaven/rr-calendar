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
})
// tslint:enable:no-magic-numbers
