import {IPositionInfo} from './eventPositioning'
import NumericallyComparable from './range/NumericallyComparable'
import Range from './range/Range'

export type IPositionInfoPartial = Pick<IPositionInfo, 'columns' | 'index'>

const calculateParallelColumns = <T extends NumericallyComparable>(
    target: Range<T>,
    allRanges: Array<Range<T>>,
    log: boolean = false
): IPositionInfoPartial => {
    const index = calculateIndexes(target, allRanges).index

    const boundaryColumnsMap = calculateBoundariesMap(allRanges)

    const columns = maxOverlaps(target, allRanges, boundaryColumnsMap)

    return { columns, index }
}

const calculateIndexes = <T extends NumericallyComparable>(
    target: Range<T>,
    allRanges: Array<Range<T>>
): {index: number} => {
    let index = 0
    if (allRanges.length > 0) {
        const declaredBeforeTarget = allRanges.slice(0, allRanges.indexOf(target))
        const declaredBeforeTargetAndOverlapping = declaredBeforeTarget
            .filter(other => target.overlapsRange(other))
        const claimedIndexes = declaredBeforeTargetAndOverlapping
            .map(other => calculateIndexes(other, declaredBeforeTarget).index)
        while (claimedIndexes.indexOf(index) > -1) {
            index+= 1
        }
    }

    return { index }
}

const maxOverlaps = <T extends NumericallyComparable>(
    target: Range<T>,
    allRanges: Array<Range<T>>,
    boundaryColumnsMap: Map<Range<T>, number>
): number => {
    const max = (a: T, b: T) => a > b ? a : b
    const min = (a: T, b: T) => a < b ? a : b

    const recursiveOverlaps = overlapFilter(target, allRanges)
    const overlapLower = recursiveOverlaps.map(range => range.lower).reduce(min)
    const overlapUpper = recursiveOverlaps.map(range => range.upper).reduce(max)
    const totalOverlapRange = Range.fromToLessThan(overlapLower, overlapUpper)
    const totalColumns = Math.max(
        ...Array.from(boundaryColumnsMap.keys())
            .filter(other => totalOverlapRange.overlapsRange(other))
            .map(key => boundaryColumnsMap.get(key) || 0)
    )

    return totalColumns
}

const selfOverlaps = <T extends NumericallyComparable>(
    target: Range<T>,
    allRanges: Array<Range<T>>
): number => {
    return allRanges.filter(other => target.overlapsRange(other)).length
}

const overlapFilter = <T extends NumericallyComparable>(
    target: Range<T>,
    allRanges: Array<Range<T>>
): Array<Range<T>> => {
    let previousRange: Range<T>
    if (target.lower instanceof Date) {
        previousRange = forceRangeType<T>(Range.emptyDate())
    } else {
        previousRange = forceRangeType<T>(Range.emptyNumeric())
    }
    let currentRange = target
    while (!previousRange.equals(currentRange)) {
        previousRange = currentRange
        currentRange = allRanges
            .filter(other => currentRange.overlapsRange(other))
            .reduce((a, b) => {
                const c = a.union(b)
                return Range.fromToLessThan(c.lower, c.upper)
            }, currentRange)
    }

    const results = allRanges.filter(other => currentRange.overlapsRange(other))
    return results.length > 0 ? results : [ target ]
}

// tslint:disable-next-line:no-any
const forceType = <T extends NumericallyComparable>(input: any) => input as T
// tslint:disable-next-line:no-any
const forceRangeType = <T extends NumericallyComparable>(input: Range<any>) => input as Range<T>

const maxDateValue = 8640000000000000
const minDateValue = -maxDateValue

/**
 * Generates a 'boundary map' to show how many overlaps there are at a given time.
 *
 * i.e. one shift, 9-5, results in a map:
 *
 *     {
 *         00:00..<09:00: 0,
 *         09:00..<17:00: 1,
 *         17:00..<23:59: 0
 *     }
 *
 * @param {Array<Range<T>>} allRanges
 * @returns {Map<Range<T>, number>}
 */
export const calculateBoundariesMap = <T extends NumericallyComparable>(
    allRanges: Array<Range<T>>
): Map<Range<T>,  number> => {
    const unique = (item: T, index: number, arr: T[]) => arr.indexOf(item) === index

    if (allRanges.length < 1) {
        throw new Error('Cannot calculateBoundariesMap with no ranges')
    }

    return allRanges
        .reduce((arr, item) => arr.concat([ item.lower, item.upper ]), new Array<T>())
        .filter(unique)
        .sort((a, b) => a.valueOf() - b.valueOf())
        .map((value, index, arr): Array<Range<T>> => {
            let lower: T
            if (index < 1) {
                if (value instanceof Date) {
                    lower = forceType<T>(new Date(minDateValue))
                } else {
                    lower = forceType<T>(-Infinity)
                }
            } else {
                lower = arr[index - 1] as T
            }

            const ranges = [ Range.fromToLessThan(lower, value) ]

            if (index === arr.length - 1) {
                let upper: T
                if (value instanceof Date) {
                    upper = forceType<T>(new Date(maxDateValue))
                } else {
                    upper = forceType<T>(+Infinity)
                }

                ranges.push( Range.fromToLessThan(value, upper) )
            }

            return ranges
        })
        .reduce((a, b) => a.concat(b))
        .reduce(
            (map, range) => {
                map.set(range, selfOverlaps(range,  allRanges))
                return map
            },
            new Map<Range<T>, number>()
        )
}

export default calculateParallelColumns
