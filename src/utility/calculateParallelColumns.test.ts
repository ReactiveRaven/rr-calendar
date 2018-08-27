import calculateParallelColumns, {calculateBoundariesMap} from './calculateParallelColumns'
import Range from './range/Range'

// tslint:disable:no-magic-numbers
describe('calculateParallelColumns', () => {
    it('should be a function', () => {
        expect(calculateParallelColumns).toBeInstanceOf(Function)
    })

    it('should return the correct number of columns, and index', () => {
        const target = Range.fromToLessThan(9, 11)
        expect(calculateParallelColumns(
            target,
            [target]
        ))
            .toEqual({columns: 1, index: 0})
    })

    it('should handle multiple columns correctly', () => {
        const targetA = Range.fromToLessThan(9, 11)
        const targetB = Range.fromToLessThan(9, 11)

        const allRanges = [targetA, targetB]

        expect(calculateParallelColumns(targetA, allRanges))
            .toEqual({ columns: allRanges.length, index: 0 })

        expect(calculateParallelColumns(targetB, allRanges))
            .toEqual({ columns: allRanges.length, index: 1 })
    })

    it('should minimise column numbers', () => {
        const allRanges = [
            Range.fromToLessThan(9, 11),
            Range.fromToLessThan(11, 12)
        ]
        const targetIndex = 1
        const target = allRanges[targetIndex]

        expect(calculateParallelColumns(target, allRanges))
            .toEqual({
                columns: 1,
                index: 0
            })
    })

    it('should handle not being the first index', () => {
        const allRanges = [
            Range.fromToLessThan(11, 12),
            Range.fromToLessThan(11, 12)
        ]
        const targetIndex = 1
        const target = allRanges[targetIndex]

        expect(calculateParallelColumns(target, allRanges))
            .toEqual({
                columns: 2,
                index: targetIndex
            })
    })

    it('should handle interdependent column numbers', () => {
        const targetA = Range.fromToLessThan(10, 14)
        const targetB = Range.fromToLessThan(13, 16)
        const targetC = Range.fromToLessThan(15, 18)
        const targetD = Range.fromToLessThan(15, 18)

        const allRanges = [
            Range.fromToLessThan(9, 12),
            Range.fromToLessThan(9, 12),
            Range.fromToLessThan(9, 12),
            targetA,
            targetB,
            targetC,
            targetD
        ]

        expect(calculateParallelColumns(targetA, allRanges))
            .toEqual({
                columns: 4,
                index: 3
            })

        expect(calculateParallelColumns(targetB, allRanges, true))
            .toEqual({
                columns: 4,
                index: 0
            })

        expect(calculateParallelColumns(targetC, allRanges))
            .toEqual({
                columns: 4,
                index: 1
            })

        expect(calculateParallelColumns(targetD, allRanges))
            .toEqual({
                columns: 4,
                index: 2
            })
    })
})

describe('calculateBoundariesMap', () => {
    it('should be a function', () => {
        expect(calculateBoundariesMap).toBeInstanceOf(Function)
    })

    it('should correctly generate a boundary map', () => {
        expect(
            Array.from(calculateBoundariesMap([Range.fromToLessThan(0, 1)]).entries())
        )
            .toEqual([
                [Range.fromToLessThan(-Infinity, 0), 0],
                [Range.fromToLessThan(0, 1), 1],
                [Range.fromToLessThan(1, +Infinity), 0]
            ])

        expect(
            Array.from(
                calculateBoundariesMap([
                    Range.fromToLessThan(9, 12),
                    Range.fromToLessThan(9, 12),
                    Range.fromToLessThan(9, 12),
                    Range.fromToLessThan(10, 14),
                    Range.fromToLessThan(13, 16),
                    Range.fromToLessThan(15, 18),
                    Range.fromToLessThan(15, 18)
                ])
                    .entries()
            )
        )
            .toEqual([
                [Range.fromToLessThan(-Infinity, 9), 0],
                [Range.fromToLessThan(9, 10), 3],
                [Range.fromToLessThan(10, 12), 4],
                [Range.fromToLessThan(12, 13), 1],
                [Range.fromToLessThan(13, 14), 2],
                [Range.fromToLessThan(14, 15), 1],
                [Range.fromToLessThan(15, 16), 3],
                [Range.fromToLessThan(16, 18), 2],
                [Range.fromToLessThan(18, +Infinity), 0]
            ])

        expect(
            Array.from(
                calculateBoundariesMap([
                    Range.fromToLessThan(0, 1),
                    Range.fromToLessThan(5, 6)
                ])
                    .entries()
            )
        )
            .toEqual([
                [Range.fromToLessThan(-Infinity, 0), 0],
                [Range.fromToLessThan(0, 1), 1],
                [Range.fromToLessThan(1, 5), 0],
                [Range.fromToLessThan(5, 6), 1],
                [Range.fromToLessThan(6, +Infinity), 0],
            ])
    })
})
// tslint:enable:no-magic-numbers
